import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Home } from "./components/Home";
import { Redirect, Route, Switch } from "react-router-dom";
import { Play } from "./components/Play";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducer";
import SetLogin from "./components/SetLogin";

/*
export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    verticalAlign: "middle",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
}));
*/

export const App: React.FC = () => {
  const identity = useSelector((state: RootState) => state.loginState.Identity);

  const missingLogin = identity != null && identity.login === undefined;
  const loginNotMissing = identity != null && identity.login !== undefined;

  return (
    /*
    <StyledBox>
      <SignInButton />
      <QuestionComputer />
      <AnswerForm />
      <Leaderboard />
    </StyledBox>
    */
    <main>
      <Switch>
        <Route path="/" exact>
          {missingLogin ? (
            <Redirect to="/login" />
          ) : loginNotMissing ? (
            <Redirect to="/play" />
          ) : (
            <Home />
          )}
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/login">
          <SetLogin />
        </Route>
      </Switch>
    </main>
  );
};

/*
export const StyledBox: React.FunctionComponent = (props) => {
  const styleClass = useStyles();

  return <Box className={styleClass.root}>{props.children}</Box>;
};
*/
