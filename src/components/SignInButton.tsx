import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../redux/reducer";
import {
  setPlayWithoutLoginActionCreator,
  signIn,
  signOut,
} from "../redux/loginActions";
import { authService } from "../services/authService";
import { Button, ButtonGroup } from "@material-ui/core";
//import { useStyles } from "../App";
import { Link } from "react-router-dom";
import { updateLeaderboardWithoutLogin } from "../redux/leaderboardActions";

export const SignInButton: React.FunctionComponent = () => {
  const identity = useSelector((state: RootState) => state.loginState.Identity);

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
    <ButtonGroup
      variant="text"
      color="primary"
      aria-label="text primary button group"
    >
      <Button onClick={onClickSignInHandler}>
        <FontAwesomeIcon icon={authService.icon} />
        <span>{longText}</span>
      </Button>
      <Button
        component={Link}
        to="/play"
        onClick={onClickPlayWithoutLoginHandler}
      >
        <span>Play without Login</span>
      </Button>
    </ButtonGroup>
  );
};

export default SignInButton;
