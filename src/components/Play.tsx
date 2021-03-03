import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/reducer";
import { AnswerForm } from "./AnswerForm";
import Leaderboard from "./Leaderboard";
import { QuestionComputer } from "./QuestionComputer";
import SignOutButton from "./SignOutButton";
import { useStyles } from "./styles";

export const Play: React.FC = () => {
  const isLogged = useSelector((state: RootState) => state.loginState.IsLogged);
  const identity = useSelector((state: RootState) => state.loginState.Identity);

  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar variant="dense">
          <Grid container justify="flex-end" alignItems="center" spacing={3}>
            <Grid item>
              <Typography variant="h6">
                {isLogged ? "Welcome " + identity?.login : ""}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/about"
                className={classes.navbarLink}
              >
                <Typography variant="h6">About</Typography>
              </Button>
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
        <Grid item xs={2} style={{ minWidth: "270px" }}>
          <Leaderboard />
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" justifyContent="center" mt={5}>
            <QuestionComputer />
            <AnswerForm />
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};
