import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { RootState } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Question } from "../models/questions";
import { validateAnswerActionCreator } from "../redux/answerActions";
import { AnswerResult } from "./AnswerResult";
import Identity from "../models/identity";

export const AnswerForm: React.FunctionComponent = () => {
  const [choice, setChoice] = useState("");

  const dispatch = useDispatch();

  const selectedQuestion: Question | null = useSelector(
    (state: RootState) => state.questionsState.SelectedQuestion
  );
  const answerResult: string | null = useSelector(
    (state: RootState) => state.questionsState.UserAnswerResult
  );
  const identity: Identity | null = useSelector(
    (state: RootState) => state.loginState.Identity
  );
  const currentScore: Number = useSelector(
    (state: RootState) => state.loginState.Score
  );
  const minScore: Number = useSelector(
    (state: RootState) => state.leaderboardState.MinScore
  );

  const dispatchValidation = (event: any) => {
    event.preventDefault(); //to prevent POST redirection after submit

    dispatch(
      validateAnswerActionCreator(
        identity,
        selectedQuestion?.id,
        choice,
        currentScore,
        minScore
      )
    );

    setChoice("");
  };

  if (selectedQuestion === null) {
    return <div />;
  }

  if (answerResult !== null) {
    return <AnswerResult />;
  }

  const listAnswers = selectedQuestion.answers.map((oneAnswer, index) => (
    <FormControlLabel value={oneAnswer} control={<Radio />} label={oneAnswer} />
  ));

  return (
    <form onSubmit={(e) => dispatchValidation(e)}>
      <FormControl component="fieldset">
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <FormLabel component="legend">
              {selectedQuestion.interrogation}
            </FormLabel>
          </Grid>
          <Grid item>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              onChange={(event) => setChoice(event.target.value)}
            >
              {listAnswers}
            </RadioGroup>
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined">
              Submit Answer
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};
