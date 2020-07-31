import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Button } from "components/index";
import { SessionDataLogin, RxStatusFormLogin } from "components/Login/type";
import { logoutSession } from "components/Login/action";

const mapDispatch = (dispatch: Function) => {
  return {
    LogoutLogin: (token: string) => {
      dispatch(logoutSession(token));
    },
  };
};

const mapState = (state: RxStatusFormLogin): SessionDataLogin => {
  return {
    ...state.FormLoginReducer.session,
  };
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

export const Profile: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <h1>Hi, {props.nickname}</h1>
      <br />
      <Button
        type="button"
        text="LogOut"
        click={() => props.LogoutLogin(props.token)}
      />
    </>
  );
};

export default connector(Profile);
