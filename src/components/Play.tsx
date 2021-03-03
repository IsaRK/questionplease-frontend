import { Box, Grid } from "@material-ui/core";
import React from "react";
import { AnswerForm } from "./AnswerForm";
import Leaderboard from "./Leaderboard";
import NavBar from "./NavBar";
import { QuestionComputer } from "./QuestionComputer";

export const Play: React.FC = () => {
  return (
    <div>
      <NavBar />

      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={2} style={{ minWidth: "270px" }}>
          <Leaderboard />
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" justifyContent="center" mt={5}>
            <QuestionComputer />
            <AnswerForm />
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};
