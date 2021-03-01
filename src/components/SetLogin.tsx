import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { setLoginAction } from "../redux/loginActions";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
//import { useStyles } from "../App";
import { Link, useHistory } from "react-router-dom";

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
    <Box display="flex" justifyContent="center" mt={5}>
      <Formik
        initialValues={{ login: "" }}
        onSubmit={(values) => {
          addLogin(values.login);
          history.push("/play");
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
                <Typography variant="h6">Choose a login</Typography>
              </Grid>
              <Grid item>
                <TextField
                  name="login"
                  value={values.login}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item>
                <ButtonGroup
                  variant="text"
                  aria-label="text primary button group"
                >
                  <Button component={Link} to="/">
                    Go back
                  </Button>
                  <Button type="submit">Submit</Button>
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
