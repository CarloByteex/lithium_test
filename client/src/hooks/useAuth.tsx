import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { IRedux } from "../store";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN, OAUTH_GOOGLE, REGISTER } from "../store/mutations/AuthMutation";
import { AppDispatch } from "../store";
import { reset, setMessage } from "../store/slices/Auth";
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
  const { setAuthenticate, setAuthToken } = useAuthenticate();
  const message = useSelector<IRedux, string>(state => state.reducers.auth.message);

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
          console.log(err);
        }
      })
    })
  }

  const login = (email: string, password: string) => {
    loginUser({
      variables: { data: { email, password } },
      onCompleted: (result) => {
        dispatch(setMessage("Signin Success!"));
        setAuthToken(result.login);
      },
      onError: (err) => {
        console.log(err.message);
        dispatch(setMessage(err.message));
      }
    })
  };

  const register = (data: IUser) => {
    registerUser({
      variables: { data },
      onCompleted: (result) => {
        dispatch(setMessage("Signup Success!"));
        setAuthToken(result.register);
      },
      onError: (err) => {
        console.log(err.message);
        dispatch(setMessage(err.message));
      }
    })
  };

  const googleAuth = useGoogleLogin({
    onSuccess: response => {
      const token = `Bearer ${response.access_token}`;
      oAuthGoogle({
        variables: { token },
        onCompleted: (result) => {
          dispatch(setMessage("Authentication Success!"));
          setAuthToken(result.oAuthGoogle);
        },
        onError: (err) => {
          console.log(err);
          dispatch(setMessage(err.message));
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
    isAuth,
    message
  }
}

export default useAuth;