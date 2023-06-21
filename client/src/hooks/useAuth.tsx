import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN, OAUTH_GOOGLE, REGISTER } from "../store/mutations/AuthMutation";
import { AppDispatch } from "../store";
import { reset } from "../store/slices/Auth";
import { AUTHENTICATE } from "../store/queries/UserQuery";
import useAuthenticate from "./useAuthenticate";
import { resetToken } from "../store/slices/AuthToken";

interface IUser {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token, setAuthenticate, setAuthToken } = useAuthenticate();

  // GraphQL - login & register

  const [loginUser] = useMutation(LOGIN);
  const [registerUser] = useMutation(REGISTER);
  const [oAuthGoogle] = useMutation(OAUTH_GOOGLE);
  const [isAuthenticated] = useLazyQuery(AUTHENTICATE);

  const isAuth = async () => {
    return new Promise((resolve) => {
      isAuthenticated({
        onCompleted: (res) => {
          if (res.isAuthenticated != null) {
            setAuthenticate(res.isAuthenticated);
            resolve(true);
          } else {
            dispatch(reset());
            resolve(false);
          }
        },
        onError: (err) => {
          navigate("/status/500");
        }
      })
    })
  }

  const login = (email: string, password: string) => {
    loginUser({
      variables: { data: { email, password } },
      onCompleted: (result) => {
        setAuthToken(result.login);
      },
      onError: (err) => {
        console.log(err);
      }
    })
  };

  const register = (data: IUser) => {
    registerUser({
      variables: { data },
      onCompleted: (result) => {
        setAuthToken(result.register);
      },
      onError: (err) => {
        console.log(err);
      }
    })
  };

  const googleAuth = useGoogleLogin({
    onSuccess: response => {
      const token = `Bearer ${response.access_token}`;
      oAuthGoogle({
        variables: { token },
        onCompleted: (result) => {
          setAuthToken(result.oAuthGoogle);
        },
        onError: (err) => {
          console.log(err);
        }
      })
    }
  });

  const logout = () => {
    dispatch(resetToken());
  }

  return {
    login,
    register,
    googleAuth,
    logout,
    isAuth
  }
}

export default useAuth;