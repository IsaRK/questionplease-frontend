import "./App.css";
import React from "react";
import { Home } from "./components/Home";
import { Redirect, Route, Switch } from "react-router-dom";
import { Play } from "./components/Play";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducer";
import SetLogin from "./components/SetLogin";
import About from "./components/About";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./components/styles";

export const App: React.FC = () => {
  const identity = useSelector((state: RootState) => state.loginState.Identity);

  const missingLogin = identity != null && identity.login === undefined;
  const loginNotMissing = identity != null && identity.login !== undefined;

  return (
    <ThemeProvider theme={theme}>
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
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </main>
    </ThemeProvider>
  );
};
