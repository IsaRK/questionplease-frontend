import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/reducer";
import SignOutButton from "./SignOutButton";
import { useStyles } from "./styles";

export const NavBar: React.FunctionComponent = () => {
  const isLogged = useSelector((state: RootState) => state.loginState.IsLogged);
  const identity = useSelector((state: RootState) => state.loginState.Identity);

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar variant="dense">
        <Grid container justify="flex-end" alignItems="center" spacing={3}>
          <Grid item>
            <Typography variant="h6">
              {isLogged ? "Welcome " + identity?.login : ""}
            </Typography>
          </Grid>
          <Grid item>
            <Button component={Link} to="/about" className={classes.navbarLink}>
              <Typography variant="h6">About</Typography>
            </Button>
          </Grid>
          <Grid item>
            <SignOutButton />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
