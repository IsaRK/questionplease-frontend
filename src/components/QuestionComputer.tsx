import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";

import { RootState } from "../redux/reducer";
import {
  getNextQuestionActionCreator,
  QuestionsAction,
} from "../redux/questionsActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Question } from "../models/questions";
import { useStyles } from "./styles";
import Spinner from "./Spinner";

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
  getNextQuestion,
}) => {
  //useDispatch returns a function that we name dispatch
  //We then invoke actions using dispatch by passing our action creators into it
  const dispatch = useDispatch();
  const classes = useStyles();

  const [fetchingQuestion, setFetchingQuestion] = useState(false);

  if (selectedQuestion == null) {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            className={classes.clickeable}
            onClick={() => {
              setFetchingQuestion(true);
              dispatch(getNextQuestion);
            }}
            disabled={false}
          >
            <Typography variant="h5">Question Please</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Spinner isLoading={fetchingQuestion} label="Fetching Question" />
        </Grid>
      </Grid>
    );
  }

  return <div />;
};

export const QuestionComputer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedQuestionComputer);
