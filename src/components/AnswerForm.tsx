import React from "react";
import TextField from "@material-ui/core/TextField";
import { Form, Formik } from "formik";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { useStyles } from "../App";
import { RootState } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Question } from "../models/questions";
import { validateAnswerActionCreator } from "../redux/answerActions";
import { AnswerResult } from "./AnswerResult";
import { updateLeaderboardActionCreator } from "../redux/leaderboardActions";
import Identity from "../models/identity";

export const AnswerForm: React.FunctionComponent = () => {
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

  const dispatchValidation = (
    identity: Identity | null,
    questionId: number,
    userAnswer: string
  ) => {
    dispatch(validateAnswerActionCreator(identity?.id, questionId, userAnswer));
    dispatch(updateLeaderboardActionCreator(identity));
  };

  const styleClass = useStyles();

  if (selectedQuestion === null) {
    return <div />;
  }

  if (answerResult !== null) {
    return <AnswerResult />;
  }

  return (
    <Box className={styleClass.root}>
      <Formik
        initialValues={{ answer: "" }}
        onSubmit={(values) =>
          dispatchValidation(identity, selectedQuestion.id, values.answer)
        }
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <TextField
                name="answer"
                value={values.answer}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
