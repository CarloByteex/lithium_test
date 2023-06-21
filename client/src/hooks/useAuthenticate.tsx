import { useDispatch, useSelector } from "react-redux";
import { IRedux } from "../store";
import { IAuth, setAuth } from "../store/slices/Auth";
import { setToken } from "../store/slices/AuthToken";

const useAuthenticate = () => {
  const dispatch = useDispatch();

  const token = useSelector<IRedux, string>(state => state.persists.token.token);
  const auth = useSelector<IRedux, IAuth>(state => state.reducers.auth.auth);

  const setAuthToken = (newToken: string) => {
    dispatch(setToken(newToken));
  };
  const setAuthenticate = (newAuth: string) => {
    dispatch(setAuth(newAuth));
  };

  return {
    token,
    auth,
    setAuthToken,
    setAuthenticate
  }
}

export default useAuthenticate;