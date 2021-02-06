import React, { useCallback, useEffect } from "react";
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

interface IProps {
  questions: Question[] | null;
  selectedQuestion: Question | null;
  getQuestions: () => Promise<QuestionsAction>;
  selectRandomQuestionAction: () => QuestionsAction;
}

const mapStateToProps = (state: RootState) => ({
  questions: state.questionsState.Questions,
  selectedQuestion: state.questionsState.SelectedQuestion,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getQuestions: () => dispatch(getQuestionActionCreator()),
    selectRandomQuestionAction: () => dispatch(selectRandomQuestionAction()),
  };
};

export const UnconnectedQuestionComputer: React.FunctionComponent<IProps> = ({
  selectedQuestion,
  getQuestions,
  selectRandomQuestionAction,
}) => {
  //https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  //On utilise une callback pour garder la reference de la function
  const getQuestionsCallback = useCallback(
    () => {
      getQuestions();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  //On utilise la callback pour l'effet de memoization : on ne va appeler getQuestionsCallback que si la reference à
  //getQuestionsCallback change, c'est à dire jamais.
  useEffect(() => {
    getQuestionsCallback();
  }, [getQuestionsCallback]);

  //useDispatch returns a function that we name dispatch
  //We then invoke actions using dispatch by passing our action creators into it
  const dispatch = useDispatch();

  if (selectedQuestion == null) {
    return (
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={() => dispatch(selectRandomQuestionAction)}
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
