export const EDIT_FORM = "EDIT_FORM";
export const SUBMIT_LOGIN = "SUBMIT_LOGIN";
export const SUCCESS_LOGIN = "SUCCESS_LOGIN";
export const FAIL_LOGIN = "FAIL_LOGIN";
export const LOGOUT_SESSION = "LOGOUT_SESSION";

export interface FormLogin {
  email: string;
  password: string;
  error: boolean;
  loading: boolean;
}

export interface FormLoginResponse {
  id: string;
  fullname: string;
  nickname: string;
  email: string;
  privileges: number;
  section: Array<string>;
  token: string;
}

export interface SessionDataLogin extends Omit<FormLoginResponse, "fullname"> {
  name: string;
}

interface EventEditForm {
  type: typeof EDIT_FORM;
  payload: FormLogin;
}

interface EventSubmitLogin {
  type: typeof SUBMIT_LOGIN;
}

interface EventSuccessLogin {
  type: typeof SUCCESS_LOGIN;
  payload: SessionDataLogin;
}

interface EventFailLogin {
  type: typeof FAIL_LOGIN;
}

interface EventLogoutSession {
  type: typeof LOGOUT_SESSION;
}

/**
 *  STANDARD CONFIG
 */

export type ActionFormLogin =
  | EventEditForm
  | EventSubmitLogin
  | EventSuccessLogin
  | EventFailLogin
  | EventLogoutSession;

export interface StatusFormLogin {
  form: FormLogin;
  session: SessionDataLogin;
}

export type AttributeResponse = {
  data: FormLoginResponse;
};

export interface RxStatusFormLogin {
  FormLoginReducer: StatusFormLogin;
}
