import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import React from "react";
import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  abandonQuestion,
  getNextQuestion,
  getNextQuestionActionCreator,
  retryQuestionAction,
} from "../redux/questionsActions";
import { useStyles } from "./styles";

export const AnswerResult: React.FunctionComponent = () => {
  const isValidAnswer: Boolean | null = useSelector(
    (state: RootState) => state.questionsState.IsValidAnswer
  );
  const points: Number = useSelector(
    (state: RootState) => state.questionsState.Points
  );
  const currentQuestionId: number | undefined = useSelector(
    (state: RootState) => state.questionsState.SelectedQuestion?.id
  );
  const userId: string | undefined = useSelector(
    (state: RootState) => state.loginState.Identity?.id
  );

  const dispatch = useDispatch();
  const classes = useStyles();

  if (currentQuestionId === undefined) {
    throw new Error("Unable to load result with currentQuestionId undefined");
  }

  const dispatchRetry = () => {
    dispatch(retryQuestionAction());
  };

  const dispatchAbandon = () => {
    dispatch(abandonQuestion(userId, currentQuestionId));
    dispatchNextQuestion();
  };

  const dispatchNextQuestion = () => {
    if (userId === undefined) {
      //PlayWithoutLogin
      dispatch(getNextQuestionActionCreator());
    } else {
      dispatch(getNextQuestion(currentQuestionId + 1));
    }
  };

  if (isValidAnswer) {
    return (
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <CheckCircleOutlineIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {"You earned " + points + " point"}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={classes.clickeable}
            onClick={() => dispatchNextQuestion()}
          >
            <Typography variant="h5">Next Question Please</Typography>
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <HighlightOffIcon fontSize="large" />
      </Grid>
      <Grid item>
        <ButtonGroup variant="text">
          <Button
            variant="contained"
            onClick={() => dispatchRetry()}
            disabled={false}
            className={classes.clickeable}
          >
            <Typography variant="h5">Retry</Typography>
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatchAbandon()}
            disabled={false}
            className={classes.clickeable}
          >
            <Typography variant="h5">Next Question Please</Typography>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
