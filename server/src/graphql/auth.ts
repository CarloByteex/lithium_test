import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

import { login, oAuthGoogle, register, isAuthenticated, verifyEmail } from "../controllers/AuthController";

const typeDefs = `#graphql
  scalar Date
  scalar Void

  type User {
    id: Int
    name: String
    email: String
    updatedAt: Date
    createdAt: Date
  }

  input IUser {
    name: String
    email: String
    password: String
    confirmPassword: String
  }

  type Query {
    isAuthenticated(token: String): User
    verify(verify: String, email: String): Void
  }

  type Mutation {
    login(data: IUser): String
    register(data: IUser): String
    oAuthGoogle(token: String): String
  }
`;

const resolvers = {
  Query: {
    isAuthenticated: isAuthenticated,
    verify: verifyEmail,
  },

  Mutation: {
    login: login,
    register: register,
    oAuthGoogle: oAuthGoogle
  }
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});

export default schema;