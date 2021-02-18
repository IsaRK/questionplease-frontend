import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Question } from "../models/questions";
import { loadTestDataFromApi } from '../services/questionService';

export enum actionTypes {
  QUESTIONS_GETQUESTIONSFROMAPI = 'questions/QUESTIONS_GETQUESTIONSFROMAPI',
  QUESTIONS_SELECTRANDOM = 'question/SELECTRANDOM',
  ANSWER_VALIDATE = 'answer/VALIDATE',
  ANSWER_NEXTQUESTION = 'answer/NEXTQUESTION',
  ANSWER_RETRY = 'answer/RETRY',
}

export type QuestionsAction =
  | { type: actionTypes.QUESTIONS_GETQUESTIONSFROMAPI; questions: Question[] }
  | { type: actionTypes.QUESTIONS_SELECTRANDOM }

export function selectRandomQuestionAction(): QuestionsAction {
  return {
    type: actionTypes.QUESTIONS_SELECTRANDOM
  } as const
}

export function gettingQuestionAction(questions: Question[]): QuestionsAction {
  return {
    type: actionTypes.QUESTIONS_GETQUESTIONSFROMAPI,
    questions: questions
  } as const
}

//https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/
/*ThunkAction<R, S, E, A extends Action> type is used. It accepts following type arguments:

R stays for return type of the internal function. In the above example, internal function is async function so it returns Promise<void>
S stays for the app state
E is the extension attribute type which is not used
A is type of the action. KnownActions in example above is the union of all possible action types (type KnownActions = Action1 | Action2;)
*/
export const getQuestionActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<QuestionsAction>,
  // The type for the data within the last action
  Question[],
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  QuestionsAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const questions = await loadTestDataFromApi();
    dispatch(gettingQuestionAction(questions));
    return dispatch(selectRandomQuestionAction());
  };
};