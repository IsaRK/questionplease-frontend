import { AppBar, Box, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/reducer";
import About from "./About";
import { AnswerForm } from "./AnswerForm";
import Leaderboard from "./Leaderboard";
import { QuestionComputer } from "./QuestionComputer";
import SignOutButton from "./SignOutButton";

export const Play: React.FC = () => {
  const isLogged = useSelector((state: RootState) => state.loginState.IsLogged);
  const identity = useSelector((state: RootState) => state.loginState.Identity);

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container justify="flex-end" alignItems="baseline" spacing={3}>
            <Grid item>
              <Typography variant="subtitle1">
                {isLogged ? "Welcome " + identity?.login : ""}
              </Typography>
            </Grid>
            <Grid item>
              <Link to="/about">About</Link>
            </Grid>
            <Grid item>
              <SignOutButton />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs>
          <Leaderboard />
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center" mt={5} flexGrow={2}>
            <QuestionComputer />
            <AnswerForm />
          </Box>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};
