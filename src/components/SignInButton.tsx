import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../modules/reducer";
import { setLoginAction, signIn, signOut } from "../modules/loginActions";
import { authService } from "../services/auth-service";
import { Box, Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useStyles } from "../App";

const SignInButton: React.FunctionComponent = () => {
  const identity = useSelector((state: RootState) => state.loginState.Identity);
  const dispatch = useDispatch();

  const styleClass = useStyles();

  const onClickHandler = () => {
    dispatch(identity ? signOut() : signIn());
  };

  const addLogin = (newLogin: string) => {
    if (!!identity) {
      dispatch(setLoginAction(newLogin));
    }
  };

  const buttonText = identity ? "Sign out" : "Sign in";
  const longText = `${buttonText} with ${authService.serviceName}`;

  if (identity && !identity.login) {
    return (
      <Box className={styleClass.root}>
        <Formik
          initialValues={{ login: "" }}
          onSubmit={(values) => addLogin(values.login)}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div>
                <TextField
                  name="login"
                  value={values.login}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Box>
    );
  }

  return (
    <button type="button" onClick={onClickHandler}>
      <FontAwesomeIcon icon={authService.icon} />
      <span>{buttonText}</span>
      <span>{longText}</span>
    </button>
  );
};

export default SignInButton;
