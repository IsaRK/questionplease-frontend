import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { connect, useDispatch } from 'react-redux'

import { RootState } from '../modules/reducer';
import { selectRandomQuestionAction, getQuestionActionCreator, QuestionAnswerAction, QuestionsAction } from '../modules/questionsActions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Question } from '../modules/questions';

interface IProps {
  questions : Question[] | null;
  selectedQuestion : Question | null;
  getQuestions : () => Promise<QuestionAnswerAction>;
  selectRandomQuestionAction : () => QuestionsAction;
}

const mapStateToProps = (state: RootState) => ({
    questions: state.questionsState.Questions,
    selectedQuestion : state.questionsState.SelectedQuestion
  });

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) =>
  { 
    return {
      getQuestions: () => dispatch(getQuestionActionCreator()),
      selectRandomQuestionAction: () => selectRandomQuestionAction()
    }
  };

  /*
//useDispatch returns a function that we name dispatch
//We then invoke actions using dispatch by passing our action creators into it
const dispatch = useDispatch();
*/

export const UnconnectedQuestionComputer: React.FunctionComponent<IProps> = ({
  selectedQuestion,
  getQuestions,
  selectRandomQuestionAction,
}) => {
 
  /*If not destructued :
  React Hook useEffect has a missing dependency: 'props'. Either include it or remove the dependency array. 
  However, 'props' will change when *any* prop changes, so the preferred fix is to destructure the 'props' 
  object outside of the useEffect call and refer to those specific props inside useEffect  react-hooks/exhaustive-deps
  */
  useEffect( () => { getQuestions()}, []);

  const handleSelectRandomQuestion= () => {
    selectRandomQuestionAction;
    console.log("selectRandomQuestionClick")
  }

  if (selectedQuestion == null)
    {
      return (
        <Box display= 'flex' justifyContent= 'center'>
        <Button 
          variant="contained"
          onClick={handleSelectRandomQuestion} 
          disabled={ false }
          >
              Question Please
          </Button>  
        </Box>
      )
    }
    
    return (
      <Box display= 'flex' justifyContent= 'center'> 
        <Box>
          {selectedQuestion.interrogation}
        </Box>
      </Box>      
    )
};

export const QuestionComputer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(UnconnectedQuestionComputer);