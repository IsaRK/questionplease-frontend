import React from 'react';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { connect, useDispatch } from 'react-redux'

import { RootState } from '../modules/reducer';
import { selectAllQuestionsAction, selectRandomQuestionAction, selectAllQuestionsFromApi } from '../modules/questions';

const mapStateToProps = (state: RootState) => ({
  questions: state.questionsState.Questions,
  selectedQuestion : state.questionsState.SelectedQuestion
});

const mapDispatchToProps = { selectAllQuestionsAction, selectRandomQuestionAction, selectAllQuestionsFromApi };

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

//useDispatch returns a function that we name dispatch
//We then invoke actions using dispatch by passing our action creators into it
const dispatch = useDispatch();

const dispatchLoadFromApi = () => {
  dispatch(selectAllQuestionsFromApi());
};

export const UnconnectedQuestionComputer: React.FunctionComponent<Props> = ((props) => {
 
  if (props.selectedQuestion == null)
    {
      return (
        <Box display= 'flex' justifyContent= 'center'>
          <Button 
          variant="contained"
          onClick={dispatchLoadFromApi()} 
          disabled={ false }
          >
              Load API Questions
          </Button>
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