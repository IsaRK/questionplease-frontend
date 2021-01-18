import { actionTypes } from "./actionTypes"
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Question } from "./questions";
import { loadTestDataFromApi } from "./dataLoading";

export type QuestionsAction =
  | { type: actionTypes.QUESTIONS_READALL }
  | { type: actionTypes.QUESTIONS_GETQUESTIONSFROMAPI }
  | { type: actionTypes.QUESTIONS_SELECTRANDOM }
  | { type: actionTypes.QUESTIONS_READANSWERSFROMAPI; questions : Question[] };

  //Un action est un object simple qui contient une propriété "type"
  // TypeScript infers that this function is returning selectAllQuestionsAction
  //Actions creators are functions that create and return action objects
  export function selectAllQuestionsAction(): QuestionsAction {
    return {
      type: actionTypes.QUESTIONS_READALL
    }
  }
  
  export function selectRandomQuestionAction(): QuestionsAction {
    return {
      type: actionTypes.QUESTIONS_SELECTRANDOM
    } as const
  }

  export function gettingQuestionAction(): QuestionsAction {
    return {
      type: actionTypes.QUESTIONS_GETQUESTIONSFROMAPI
    } as const
  }

  export function gotQuestionAction(questions:Question[]): QuestionsAction {
    return {
      type: actionTypes.QUESTIONS_READANSWERSFROMAPI,
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
      dispatch(gettingQuestionAction());
      const questions = await loadTestDataFromApi();
      return dispatch(gotQuestionAction(questions));
    };
  };