import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setPlayWithoutLoginActionCreator,
  signIn,
} from "../redux/loginActions";
import { authService } from "../services/authService";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Tooltip,
  Typography,
  Zoom,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { updateLeaderboardWithoutLogin } from "../redux/leaderboardActions";
import { RootState } from "../redux/reducer";
import Spinner from "./Spinner";
import { useStyles } from "./styles";

export const SignInButton: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isLogged = useSelector((state: RootState) => state.loginState.IsLogged);

  const [fetchingUser, setFetchingUser] = useState(false);

  const onClickSignInHandler = () => {
    dispatch(signIn());
    setFetchingUser(true);
  };

  const onClickPlayWithoutLoginHandler = () => {
    dispatch(setPlayWithoutLoginActionCreator());
    dispatch(updateLeaderboardWithoutLogin());
  };

  const loading = fetchingUser && !isLogged;

  const buttonText = "  Sign in";
  const longText = `${buttonText} with ${authService.serviceName}`;

  return (
    <Grid container direction="column">
      <Grid item>
        <ButtonGroup variant="text">
          <Tooltip
            arrow
            title="SignIn and choose a login to keep track of your score and appear in the leaderboard"
            TransitionComponent={Zoom}
            className={classes.tooltip}
          >
            <Button onClick={onClickSignInHandler}>
              <Box mr={1}>
                <FontAwesomeIcon icon={authService.icon} />
              </Box>
              <Typography variant="h6">{longText}</Typography>
            </Button>
          </Tooltip>
          <Tooltip
            arrow
            title="You will not appear on the leaderboard"
            TransitionComponent={Zoom}
            className={classes.tooltip}
          >
            <Button
              component={Link}
              to="/play"
              onClick={onClickPlayWithoutLoginHandler}
            >
              <Typography variant="h6">Play without Login</Typography>
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Box padding={3}>
          <Spinner isLoading={loading} label="Fetching your login" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInButton;
