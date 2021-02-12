import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../modules/reducer";
import { signIn, signOut } from "../modules/loginActions";
import { authService } from "../services/auth-service";

const SignInButton: React.FunctionComponent = () => {
  const identity = useSelector((state: RootState) => state.loginState.Identity);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(identity ? signOut() : signIn());
  };

  const buttonText = identity ? "Sign out" : "Sign in";
  const longText = `${buttonText} with ${authService.serviceName}`;

  return (
    <button type="button" onClick={onClickHandler}>
      <FontAwesomeIcon icon={authService.icon} />
      <span>{buttonText}</span>
      <span>{longText}</span>
    </button>
  );
};

export default SignInButton;
