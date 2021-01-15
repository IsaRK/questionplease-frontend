import React from 'react';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux'

import { RootState } from '../modules/reducer';
import { selectAllQuestionsAction, selectRandomQuestionAction } from '../modules/questions';

const mapStateToProps = (state: RootState) => ({
  questions: state.questionsState.Questions,
  selectedQuestion : state.questionsState.SelectedQuestion
});

const mapDispatchToProps = { selectAllQuestionsAction, selectRandomQuestionAction };

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const UnconnectedQuestionComputer: React.FunctionComponent<Props> = ((props) => {

  if (props.selectedQuestion == null)
    {
      return (
        <Box display= 'flex' justifyContent= 'center'>
        <Button 
          variant="contained"
          onClick={props.selectRandomQuestionAction} 
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
          {props.selectedQuestion.interrogation}
        </Box>
      </Box>      
    )
})

export const QuestionComputer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(UnconnectedQuestionComputer);