import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { setLoginAction } from "../redux/loginActions";
import { Box, Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
//import { useStyles } from "../App";
import { useHistory } from "react-router-dom";

export const SetLogin: React.FunctionComponent = () => {
  const identity = useSelector((state: RootState) => state.loginState.Identity);

  const dispatch = useDispatch();
  let history = useHistory();

  const addLogin = (newLogin: string) => {
    if (!!identity) {
      dispatch(setLoginAction(newLogin, identity));
    }
  };

  return (
    <Box>
      <Formik
        initialValues={{ login: "" }}
        onSubmit={(values) => {
          addLogin(values.login);
          history.push("/play");
        }}
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
};

export default SetLogin;
