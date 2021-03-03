import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useStyles } from "./styles";

export const About: React.FunctionComponent = () => {
  const classes = useStyles();

  const content = `This is my first website ! \n 
  It was made with love and patience using :`;

  /*
  var __html = require("./tagcloud.html");
  var template = { __html: __html };
  */
  //<div dangerouslySetInnerHTML={template} />

  return (
    <div>
      <NavBar />
      <Box display="flex" justifyContent="center" mt={5}>
        <Grid container direction="column" alignItems="center">
          <Typography
            variant="h6"
            display="inline"
            style={{ whiteSpace: "pre-line" }}
          >
            <div>{content}</div>
          </Typography>
          <Button
            component={Link}
            to="/play"
            variant="contained"
            className={classes.clickeable}
          >
            <Typography variant="h5">Go back to game</Typography>
          </Button>
        </Grid>
      </Box>
    </div>
  );
};

export default About;
