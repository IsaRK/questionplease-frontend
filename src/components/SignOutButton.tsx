import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "../redux/loginActions";
import { authService } from "../services/authService";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const SignOutButton: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const onClickSignOutHandler = () => {
    dispatch(signOut());
  };

  const buttonText = "Sign Out";

  return (
    <Button
      component={Link}
      to="/"
      onClick={onClickSignOutHandler}
      color="inherit"
    >
      <Typography variant="h6">
        <FontAwesomeIcon icon={authService.icon} />
        {buttonText}
      </Typography>
    </Button>
  );
};

export default SignOutButton;
