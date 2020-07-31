import {
  EDIT_FORM,
  SUBMIT_LOGIN,
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  LOGOUT_SESSION,
  FormLogin,
  ActionFormLogin,
  SessionDataLogin,
} from "./type";
import { LoginService, LogOutSession } from "./service";
import { setSession, getSession, delSession } from "helpers/index";
export type dispatchLogin = (_: ActionFormLogin) => void;

export const restoreLogin = () => {
  return (dispatch: dispatchLogin) => {
    const session = getSession();
    if (session) {
      dispatch(successLogin(session));
    }
  };
};

export const editFormLogin = (form: FormLogin) => {
  return (dispatch: dispatchLogin) => {
    dispatch(editForm(form));
  };
};

const editForm = (form: FormLogin): ActionFormLogin => ({
  type: EDIT_FORM,
  payload: form,
});

export const submitFormLogin = (form: FormLogin) => {
  return (dispatch: dispatchLogin) => {
    LoginService(form)
      .then((data) => {
        dispatch(successLogin(data));
        setSession(data);
      })
      .catch(() => {
        dispatch(failLogin());
      });
    dispatch(submitLogin());
  };
};

const submitLogin = (): ActionFormLogin => ({
  type: SUBMIT_LOGIN,
});

const successLogin = (payload: SessionDataLogin): ActionFormLogin => ({
  type: SUCCESS_LOGIN,
  payload: { ...payload },
});

const failLogin = (): ActionFormLogin => ({
  type: FAIL_LOGIN,
});

export const logoutSession = (token: string) => {
  return (dispatch: dispatchLogin) => {
    LogOutSession(token).then(() => {
      delSession();
      dispatch(logOut());
    });
  };
};

const logOut = (): ActionFormLogin => ({
  type: LOGOUT_SESSION,
});
