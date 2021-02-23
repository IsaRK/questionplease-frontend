import React, { useState } from "react";
import { Box } from "@material-ui/core";
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
    <div className="radio" key={index}>
      <label>
        <input
          type="radio"
          key={index}
          value={oneAnswer}
          checked={choice === oneAnswer}
          onChange={(event) => setChoice(event.target.value)}
        />
        {oneAnswer}
      </label>
    </div>
  ));

  return (
    <Box>
      <form onSubmit={(e) => dispatchValidation(e)}>
        {listAnswers}
        <button type="submit">Submit</button>
      </form>
    </Box>
  );
};
