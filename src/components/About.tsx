import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const About: React.FunctionComponent = () => {
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Grid container direction="column" alignItems="center">
        <Typography>This is an About</Typography>
        <Button component={Link} to="/play">
          Go back to game
        </Button>
      </Grid>
    </Box>
  );
};

export default About;
