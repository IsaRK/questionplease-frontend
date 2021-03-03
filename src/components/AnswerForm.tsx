import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { RootState } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Question } from "../models/questions";
import { validateAnswerActionCreator } from "../redux/answerActions";
import { AnswerResult } from "./AnswerResult";
import Identity from "../models/identity";
import { useStyles } from "./styles";

export const AnswerForm: React.FunctionComponent = () => {
  const [choice, setChoice] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();

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

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const dispatchValidation = (event: any) => {
    event.preventDefault(); //to prevent POST redirection after submit

    if (!choice) {
      setError(true);
      setHelperText("Please select an option.");
    } else {
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
    }
  };

  if (selectedQuestion === null) {
    return <div />;
  }

  if (answerResult !== null) {
    return <AnswerResult />;
  }

  const listAnswers = selectedQuestion.answers.map((oneAnswer, index) => (
    <FormControlLabel
      value={oneAnswer}
      control={<Radio />}
      label={oneAnswer}
      key={index}
    />
  ));

  return (
    <form onSubmit={(e) => dispatchValidation(e)}>
      <FormControl component="fieldset" error={error}>
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item style={{ maxWidth: "500px" }}>
            <FormLabel component="legend">
              <Typography variant="h6" color="secondary">
                {selectedQuestion.interrogation}
              </Typography>
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
            <FormHelperText>{helperText}</FormHelperText>
            <Button
              type="submit"
              variant="contained"
              className={classes.clickeable}
            >
              <Typography variant="h5">Submit Answer</Typography>
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};
