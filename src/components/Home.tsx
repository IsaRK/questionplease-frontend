import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import SignInButton from "./SignInButton";
import { useStyles } from "./styles";

function MainTitleStyled() {
  const classes = useStyles();

  return <Typography variant="h2">Question Please ?</Typography>;
}

export const Home: React.FC = () => {
  return (
    <Box mt={25}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <MainTitleStyled />
        </Grid>
        <Grid item>
          <SignInButton />
        </Grid>
      </Grid>
    </Box>
  );
};
