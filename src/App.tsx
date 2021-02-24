import Box from "@material-ui/core/Box";
import "./App.css";
import { QuestionComputer } from "./components/QuestionComputer";
import { AnswerForm } from "./components/AnswerForm";
import { makeStyles } from "@material-ui/core/styles";
import { SignInButton } from "./components/SignInButton";
import Leaderboard from "./components/Leaderboard";
import React from "react";
import { Home } from "./components/Home";
import { Route, Switch } from "react-router-dom";
import { Play } from "./components/Play";

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
          <Home />
        </Route>
        <Route path="/play">
          <Play />
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
