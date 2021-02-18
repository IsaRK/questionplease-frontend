import React from "react";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { connect, useDispatch } from "react-redux";

import { RootState } from "../modules/reducer";
import {
  selectRandomQuestionAction,
  getQuestionActionCreator,
  QuestionsAction,
} from "../modules/questionsActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Question } from "../modules/questions";
import Identity from "../modules/identity";

interface IProps {
  questions: Question[] | null;
  selectedQuestion: Question | null;
  identity: Identity | null;
  getQuestions: () => Promise<QuestionsAction>;
  selectRandomQuestionAction: () => QuestionsAction;
}

const mapStateToProps = (state: RootState) => ({
  questions: state.questionsState.Questions,
  selectedQuestion: state.questionsState.SelectedQuestion,
  identity: state.loginState.Identity,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getQuestions: () => dispatch(getQuestionActionCreator()),
    selectRandomQuestionAction: () => dispatch(selectRandomQuestionAction()),
  };
};

export const UnconnectedQuestionComputer: React.FunctionComponent<IProps> = ({
  selectedQuestion,
  identity,
  getQuestions,
}) => {
  //useDispatch returns a function that we name dispatch
  //We then invoke actions using dispatch by passing our action creators into it
  const dispatch = useDispatch();

  let textValue = null;
  if (identity === null) {
    textValue = "null identity";
  } else if (identity.login === undefined) {
    textValue = "undefined login";
  } else {
    textValue = identity.login;
  }

  if (selectedQuestion == null) {
    return (
      <Box display="flex" justifyContent="center">
        <label>{textValue}</label>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(getQuestions);
          }}
          disabled={false}
        >
          Question Please
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box>{selectedQuestion.interrogation}</Box>
    </Box>
  );
};

export const QuestionComputer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedQuestionComputer);
