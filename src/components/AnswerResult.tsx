import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import React from "react";
import { Box, Button } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  abandonQuestion,
  getNextQuestion,
  retryQuestionAction,
} from "../redux/questionsActions";

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

  const dispatchRetry = () => {
    dispatch(retryQuestionAction());
  };

  if (currentQuestionId === undefined) {
    throw new Error("Unable to load result with currentQuestionId undefined");
  }

  if (isValidAnswer) {
    return (
      <Box display="flex" justifyContent="center">
        <CheckCircleOutlineIcon />
        <div>
          <label>{"You earned " + points + " points with this question"}</label>
        </div>
        <Button
          variant="contained"
          onClick={() => dispatch(getNextQuestion(currentQuestionId + 1))}
          disabled={false}
        >
          Next Question Please
        </Button>
      </Box>
    );
  }

  if (userId === undefined) {
    throw new Error("Unable to load result with userId undefined");
  }

  return (
    <Box display="flex" justifyContent="center">
      <HighlightOffIcon />
      <Button
        variant="contained"
        onClick={() => dispatchRetry()}
        disabled={false}
      >
        Retry
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch(abandonQuestion(userId, currentQuestionId))}
        disabled={false}
      >
        Next Question Please
      </Button>
    </Box>
  );
};
