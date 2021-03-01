import { Box, Grid, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import React from "react";
import SignInButton from "./SignInButton";
import { withStyles } from "@material-ui/core/styles";

/*
const styles = theme => ({
  const styles = () => ({
  buttonPadding: {    
    padding: '30px',   
  },
});
*/

export const Home: React.FC = () => {
  return (
    <Box mt={25}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h3">Question Please</Typography>
        </Grid>
        <Grid item>
          <SignInButton />
        </Grid>
      </Grid>
    </Box>
  );
};

//export default withStyles(styles)(Home);
