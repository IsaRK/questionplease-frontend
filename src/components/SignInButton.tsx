import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setPlayWithoutLoginActionCreator,
  signIn,
} from "../redux/loginActions";
import { authService } from "../services/authService";
import { Button, ButtonGroup } from "@material-ui/core";
//import { useStyles } from "../App";
import { Link } from "react-router-dom";
import { updateLeaderboardWithoutLogin } from "../redux/leaderboardActions";

export const SignInButton: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  //const styleClass = useStyles();

  const onClickSignInHandler = () => {
    dispatch(signIn());
  };

  const onClickPlayWithoutLoginHandler = () => {
    dispatch(setPlayWithoutLoginActionCreator());
    dispatch(updateLeaderboardWithoutLogin());
  };

  const buttonText = "Sign in";
  const longText = `${buttonText} with ${authService.serviceName}`;

  return (
    <ButtonGroup variant="text" aria-label="text primary button group">
      <Button onClick={onClickSignInHandler}>
        <FontAwesomeIcon icon={authService.icon} />
        {longText}
      </Button>
      <Button
        component={Link}
        to="/play"
        onClick={onClickPlayWithoutLoginHandler}
      >
        Play without Login
      </Button>
    </ButtonGroup>
  );
};

export default SignInButton;
