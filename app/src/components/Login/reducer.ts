import {
  EDIT_FORM,
  SUBMIT_LOGIN,
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  LOGOUT_SESSION,
  StatusFormLogin,
  ActionFormLogin,
} from "./type";

export const initialState = (): StatusFormLogin => ({
  form: {
    email: "",
    password: "",
    error: false,
    loading: false,
  },
  session: {
    id: "",
    name: "",
    nickname: "",
    email: "",
    privileges: 0,
    section: [],
    token: "",
  },
});

export const FormLoginReducer = (
  state: StatusFormLogin = initialState(),
  action: ActionFormLogin
): StatusFormLogin => {
  switch (action.type) {
    case EDIT_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    case SUBMIT_LOGIN:
      return {
        ...state,
        form: {
          ...state.form,
          loading: true,
        },
      };
    case SUCCESS_LOGIN:
      return {
        ...state,
        form: {
          ...state.form,
          loading: false,
          error: false,
        },
        session: {
          ...action.payload,
        },
      };
    case FAIL_LOGIN:
      return {
        ...state,
        form: {
          ...state.form,
          loading: false,
          error: true,
        },
      };
    case LOGOUT_SESSION:
      return {
        ...initialState(),
      };
    default:
      return state;
  }
};
