import express from "express"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import axios from "axios";

const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "jwt_secret";
const prisma = new PrismaClient();

interface IUser {
  name?: string
  email: string
  token: string
  password: string
  confirmPassword?: string
}

export const isAuthenticated = async (root: any, args: any, req: express.Request) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Account user is not authenticated");

    const token = authorization.replace("Bearer ", "") as string;
    const user = JWT.verify(token, JWT_SECRET);
    const { id, email } = (<any>user);
    const verifyUser = await prisma.user.findFirst({
      where: { id }
    });

    if (verifyUser && verifyUser.email === email) {
      return verifyUser;
    }
    else return {};
  } catch (err) {
    return err;
  }
}

export const login = async (root: any, args: { data: IUser }) => {
  const { email, password } = args.data;

  try {
    const user = await prisma.user.findFirst({
      where: { email }
    });

    if (!user) throw new Error("Account is not exist");
    const validPassword = await bcrypt.hash(password, user.salt);
    if (validPassword !== user.password) throw new Error("Incorrect Password");

    const token = JWT.sign(user, JWT_SECRET);
    return token;

  } catch (err) {
    return err;
  }
}

export const register = async (root: any, args: { data: IUser }) => {
  const { name, email, password, confirmPassword } = args.data;

  try {
    if (password !== confirmPassword) throw new Error("Those passwords didn't match. Try again.");

    const emailExist = await prisma.user.findFirst({
      where: { email }
    });

    if (emailExist) throw new Error("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verifyCode = await JWT.sign(salt, JWT_SECRET);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        salt,
        password: hashedPassword,
        verifyCode
      }
    });
    const token = JWT.sign(user, JWT_SECRET);

    return token;
  } catch (err) {
    return err;
  }
};

export const oAuthGoogle = async (root: any, args: { token: string }) => {
  try {
    const { name, email, email_verified } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: args.token },
    }).
      then(res => res.data)
      .catch(err => { throw new Error(err) });

    if (!email_verified) throw new Error("Email is not verified");

    const emailExist = await prisma.user.findFirst({
      where: { email }
    });

    if (emailExist) {
      const userToken = JWT.sign(emailExist, JWT_SECRET);
      return userToken;
    }

    const verifyCode = await JWT.sign(email, JWT_SECRET);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        verifyCode
      }
    });

    const userToken = JWT.sign(user, JWT_SECRET);
    return userToken;
  }
  catch (err) {
    return err;
  }
}

export const verifyEmail = async (root: any, args: { verify: string, email: string }) => {
  const { verify, email } = args;

  const user = await prisma.user.findFirst({
    where: { email }
  });

  await prisma.user.updateMany({
    where: {
      email,
      verifyCode: verify,
      emailVerified: false
    },
    data: { emailVerified: true }
  });

  console.log(user);
}