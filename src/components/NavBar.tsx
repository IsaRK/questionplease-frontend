import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/reducer";
import { authService } from "../services/authService";
import SignOutButton from "./SignOutButton";
import { useStyles } from "./styles";

export const NavBar: React.FunctionComponent = () => {
  const isLogged = useSelector((state: RootState) => state.loginState.IsLogged);
  const identity = useSelector((state: RootState) => state.loginState.Identity);

  const classes = useStyles();

  const signInButton = (
    <Button component={Link} to="/" className={classes.navbarLink}>
      <Typography variant="h6">
        <FontAwesomeIcon icon={authService.icon} />
        {" SignIn"}
      </Typography>
    </Button>
  );

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
          <Grid item>{isLogged ? <SignOutButton /> : signInButton}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
