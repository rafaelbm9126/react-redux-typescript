import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { restoreLogin } from "components/Login/action";
import { RxStatusFormLogin, SessionDataLogin } from "components/Login/type";
import { Home } from "pages/home";
import Profile from "pages/profile";

const mapDispatch = (dispatch: Function) => {
  return {
    restore: () => {
      dispatch(restoreLogin());
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

const Routers: React.FunctionComponent<Props> = (props) => {
  React.useEffect(() => {
    props.restore();
  });
  return (
    <Router>
      <Switch>
        <Route path="/profile">
          {props.token.length ? <Profile /> : <Redirect to={"/"} />}
        </Route>
        <Route path="/">
          {props.token.length ? <Redirect to={"/profile"} /> : <Home />}
        </Route>
      </Switch>
    </Router>
  );
};

export default connector(Routers);
