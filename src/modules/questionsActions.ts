import * as actionTypes from "./actionTypes"
import { useDispatch } from 'react-redux';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Question } from "./questions";
import { loadTestDataFromApi } from "./dataLoading";

export interface QuestionsAction {
    type: string
  }
  
  export type QuestionsActionType = QuestionsAction | IGettingQuestionAction | IGotQuestionAction;
  
  //Un action est un object simple qui contient une propriété "type"
  // TypeScript infers that this function is returning selectAllQuestionsAction
  //Actions creators are functions that create and return action objects
  export function selectAllQuestionsAction(): QuestionsAction {
    return {
      type: actionTypes.QUESTIONS_READALL
    } as const
  }
  
  export function selectRandomQuestionAction(): QuestionsAction {
    return {
      type: actionTypes.QUESTIONS_SELECTRANDOM
    } as const
  }
  
  //TODO : transform to QuestionsAction and QuestionsAction with payload = Question[]
  export interface IGettingQuestionAction
    extends Action<"questions/QUESTIONS_GETQUESTIONSFROMAPI"> {}
  
  export interface IGotQuestionAction
    extends Action<"questions/READANSWERSFROMAPI"> {
    questions: Question[];
  }
  
  //https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/
  export const getQuestionActionCreator: ActionCreator<ThunkAction<
    // The type of the last action to be dispatched - will always be promise<T> for async actions
    Promise<IGotQuestionAction>,
    // The type for the data within the last action
    Question[],
    // The type of the parameter for the nested function
    null,
    // The type of the last action to be dispatched
    IGotQuestionAction
  >> = () => {
    return async (dispatch: Dispatch) => {
      const gettingQuestionAction: IGettingQuestionAction = {
        type: actionTypes.QUESTIONS_GETQUESTIONSFROMAPI,
      };
      dispatch(gettingQuestionAction);
      const questions = await loadTestDataFromApi();
      const gotQuestionAction: IGotQuestionAction = {
        questions,
        type: actionTypes.QUESTIONS_READANSWERSFROMAPI,
      };
      return dispatch(gotQuestionAction);
    };
  };
  
  /*The selectAllQuestionsFromApi function returns a function rather than the action object 
  as it did when the function was synchronous. 
  The inner function takes in a parameter, dispatch, which is another function that is used to dispatch the action.
  
  export const selectAllQuestionsFromApi = () => async (
    dispatch: Dispatch<QuestionsAction>
  ) => {
    await loadTestDataFromApi();
    dispatch({
      type: actionTypes.QUESTIONS_READALLFROMAPI,
    } as const);
  };
  */