import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../redux/reducer";
import { setLoginAction, signIn, signOut } from "../redux/loginActions";
import { authService } from "../services/authService";
import { Box, Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useStyles } from "../App";

export const SignInButton: React.FunctionComponent = () => {
  const identity = useSelector((state: RootState) => state.loginState.Identity);
  const isLogged = useSelector((state: RootState) => state.loginState.IsLogged);

  const dispatch = useDispatch();
  const styleClass = useStyles();

  const onClickHandler = () => {
    dispatch(identity ? signOut() : signIn());
  };

  const addLogin = (newLogin: string) => {
    if (!!identity) {
      dispatch(setLoginAction(newLogin, identity));
    }
  };

  const buttonText = identity ? "Sign out" : "Sign in";
  const longText = `${buttonText} with ${authService.serviceName}`;

  if (identity != null && identity.login === undefined) {
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
    <div>
      <div>
        {isLogged ? <label>{"Welcome " + identity?.login}</label> : <div />}
      </div>

      <button type="button" onClick={onClickHandler}>
        <FontAwesomeIcon icon={authService.icon} />
        <span>{buttonText}</span>
        <span>{longText}</span>
      </button>
    </div>
  );
};

export default SignInButton;
