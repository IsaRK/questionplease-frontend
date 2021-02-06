import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/reducer";
import React from "react";
import { Box, Button } from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { nextQuestionAnswerAction, retryAnswerAction } from "../modules/answerActions";

export const AnswerResult: React.FunctionComponent = () => {
    const answerResult:Boolean | null = useSelector((state: RootState) => state.questionsState.AnswerResult);
    const dispatch = useDispatch();

    const dispatchRetry = () => {
        dispatch(retryAnswerAction);
      }

    if (answerResult)
    {
        return (
            <Box display= 'flex' justifyContent= 'center'>
            <CheckCircleOutlineIcon/>
            <Button 
              variant="contained"
              onClick={() => dispatch(nextQuestionAnswerAction) } 
              disabled={ false }
              >
                  Next Question Please
              </Button>  
            </Box>
        )
    }

    return (
        <Box display= 'flex' justifyContent= 'center'>
        <HighlightOffIcon/>
        <Button 
          variant="contained"
          onClick={ () => dispatchRetry()}
          disabled={ false }
          >
              Retry
          </Button>
          <Button 
          variant="contained"
          onClick={() => dispatch(nextQuestionAnswerAction)} 
          disabled={ false }
          >
              Next Question Please
          </Button>  
        </Box>
    )
}