import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { setLoginAction, signOutActionCreator } from "../redux/loginActions";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";

export const SetLogin: React.FunctionComponent = () => {
  const identity = useSelector((state: RootState) => state.loginState.Identity);
  const dispatch = useDispatch();

  let history = useHistory();

  const addLogin = (newLogin: string) => {
    //we cannot use simply useState : https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately

    if (!!identity) {
      dispatch(setLoginAction(newLogin, identity));
    }
  };

  const validate = (values: { login: string }) => {
    if (!values.login) {
      return false;
    }

    return true;
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Formik
        validateOnChange
        validateOnMount={false}
        initialValues={{ login: "", isValidForm: true }}
        validate={(values) => {
          values.isValidForm = validate(values);
        }}
        onSubmit={(values) => {
          if (values.isValidForm) {
            addLogin(values.login);
            history.push("/play");
          }
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Grid
              container
              direction="column"
              spacing={3}
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h5">Choose a login</Typography>
              </Grid>
              <Grid item>
                <TextField
                  name="login"
                  value={values.login}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!values.isValidForm}
                  helperText={!values.isValidForm && "Login required"}
                />
              </Grid>
              <Grid item>
                <ButtonGroup variant="text">
                  <Button
                    component={Link}
                    to="/"
                    onClick={() => dispatch(signOutActionCreator())}
                  >
                    <Typography variant="h6">Go back</Typography>
                  </Button>
                  <Button type="submit">
                    <Typography variant="h6">Submit</Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SetLogin;
