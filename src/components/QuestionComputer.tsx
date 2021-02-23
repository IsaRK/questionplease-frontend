import React from "react";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { connect, useDispatch } from "react-redux";

import { RootState } from "../redux/reducer";
import {
  getNextQuestionActionCreator,
  QuestionsAction,
} from "../redux/questionsActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Question } from "../models/questions";

interface IProps {
  selectedQuestion: Question | null;
  isLogged: boolean;
  playWithoutLogin: boolean;
  getNextQuestion: () => Promise<QuestionsAction>;
}

const mapStateToProps = (state: RootState) => ({
  selectedQuestion: state.questionsState.SelectedQuestion,
  playWithoutLogin: state.loginState.PlayWithoutLogin,
  isLogged: state.loginState.IsLogged,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getNextQuestion: () => dispatch(getNextQuestionActionCreator()),
  };
};

export const UnconnectedQuestionComputer: React.FunctionComponent<IProps> = ({
  selectedQuestion,
  playWithoutLogin,
  isLogged,
  getNextQuestion,
}) => {
  //useDispatch returns a function that we name dispatch
  //We then invoke actions using dispatch by passing our action creators into it
  const dispatch = useDispatch();

  if (!isLogged && !playWithoutLogin) {
    return <div />;
  }

  if (selectedQuestion == null) {
    return (
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={() => {
            dispatch(getNextQuestion);
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
