import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../redux/reducer";
import { signOut } from "../redux/loginActions";
import { authService } from "../services/authService";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export const SignOutButton: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const onClickSignOutHandler = () => {
    dispatch(signOut());
  };

  const buttonText = "Sign Out";
  const longText = `${buttonText} with ${authService.serviceName}`;

  return (
    <Button component={Link} to="/" onClick={onClickSignOutHandler}>
      <FontAwesomeIcon icon={authService.icon} />
      <span>{longText}</span>
    </Button>
  );
};

export default SignOutButton;
