import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Form,
  InputEmail,
  InputPassword,
  Button,
  MessageError,
} from "components/index";
import { FormLogin, RxStatusFormLogin } from "./type";
import { editFormLogin, submitFormLogin, restoreLogin } from "./action";

const mapDispatch = (dispatch: Function) => {
  return {
    restore: () => {
      dispatch(restoreLogin());
    },
    editFormLogin: (values: FormLogin) => {
      dispatch(editFormLogin(values));
    },
    submit: (values: FormLogin) => {
      dispatch(submitFormLogin(values));
    },
  };
};

const mapState = (state: RxStatusFormLogin): FormLogin => {
  return {
    email: state.FormLoginReducer.form.email,
    password: state.FormLoginReducer.form.password,
    error: state.FormLoginReducer.form.error,
    loading: state.FormLoginReducer.form.loading,
  };
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const Login: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Form prevent={true} submit={() => props.submit({ ...props })}>
        <MessageError error={props.error}>
          Email o Contraseña Errada
        </MessageError>
        <InputEmail
          placeholder="Email"
          change={(value) => props.editFormLogin({ ...props, email: value })}
        />
        <InputPassword
          placeholder="Contraseña"
          change={(value) => props.editFormLogin({ ...props, password: value })}
        />
        <Button type="submit" text="Send" />
      </Form>
    </>
  );
};

export default connector(Login);
