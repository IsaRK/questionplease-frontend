import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useStyles } from "./styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export const About: React.FunctionComponent = () => {
  const classes = useStyles();

  const content = `This is my first website ! \n 
  Made with love and patience using :`;

  const tagCloud = (
    <Grid container id="htmltagcloud" spacing={1}>
      <Grid item className="wrd tagcloud0">
        AzureCosmosDB{" "}
      </Grid>
      <Grid item className="wrd tagcloud1">
        Formik{" "}
      </Grid>
      <Grid item className="wrd tagcloud3">
        MaterialUI{" "}
      </Grid>
      <Grid item className="wrd tagcloud1">
        AuthorizationCodeFlow{" "}
      </Grid>
      <Grid item className="wrd tagcloud2">
        ReactThunk{" "}
      </Grid>
      <Grid item className="wrd tagcloud3">
        AzureFunctions{" "}
      </Grid>
      <Grid item className="wrd tagcloud1">
        ReactRouterDom{" "}
      </Grid>
      <Grid item className="wrd tagcloud3">
        React{" "}
      </Grid>
      <Grid item className="wrd tagcloud0">
        Fontawesome{" "}
      </Grid>
      <Grid item className="wrd tagcloud3">
        Redux{" "}
      </Grid>
      <Grid item className="wrd tagcloud1">
        AzureAD{" "}
      </Grid>
      <Grid item className="wrd tagcloud3">
        TypeScript{" "}
      </Grid>
      <Grid item className="wrd tagcloud2">
        OpenTriviaDB{" "}
      </Grid>
      <Grid item className="wrd tagcloud0">
        AzurePipelines{" "}
      </Grid>
    </Grid>
  );

  return (
    <div>
      <NavBar />
      <Box display="flex" justifyContent="center" mt={5}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="flex-start"
        >
          <Grid item xs={3} justify="flex-start">
            <Box ml={3} display="flex" flexDirection="column">
              <Button
                variant="text"
                size="large"
                startIcon={<GitHubIcon />}
                target="gitHubProfile"
                href="https://github.com/IsaRK"
              >
                <Typography variant="subtitle1">GitHub profile</Typography>
              </Button>
              <Button
                variant="text"
                size="large"
                startIcon={<LinkedInIcon />}
                target="LinkedInProfile"
                href="https://www.linkedin.com/in/isabelle-riverain/"
              >
                <Typography variant="subtitle1">LinkedIn profile</Typography>
              </Button>
            </Box>
          </Grid>
          <Grid container direction="column" xs={6}>
            <Grid item>
              <Typography
                variant="h6"
                display="inline"
                style={{ whiteSpace: "pre-line" }}
              >
                {content}
              </Typography>
            </Grid>
            <Grid item>{tagCloud}</Grid>
            <Grid item>
              <Box mt={3} justifyContent="center" display="flex">
                <Button
                  component={Link}
                  to="/play"
                  variant="contained"
                  className={classes.clickeable}
                >
                  <Typography variant="h5">Back to game</Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default About;
