import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Question } from "../models/questions";
import questionService from '../services/questionService';

export enum questionActionTypes {
  QUESTIONS_GOTNEXTQUESTION = 'questions/QUESTIONS_GOTEXTQUESTION',
  QUESTIONS_RETRY = 'questions/RETRY',
  QUESTIONS_ABANDON = 'questions/ABANDON',
}

export type QuestionsAction =
  | { type: questionActionTypes.QUESTIONS_GOTNEXTQUESTION; nextQuestion: Question }
  | { type: questionActionTypes.QUESTIONS_RETRY }
  | { type: questionActionTypes.QUESTIONS_ABANDON }

export function gotNextQuestionAction(nextQuestion: Question): QuestionsAction {
  return {
    type: questionActionTypes.QUESTIONS_GOTNEXTQUESTION,
    nextQuestion: nextQuestion
  } as const
}

export function abandonQuestionAction(): QuestionsAction {
  return {
    type: questionActionTypes.QUESTIONS_ABANDON,
  } as const
}

export function retryQuestionAction(): QuestionsAction {
  return {
    type: questionActionTypes.QUESTIONS_RETRY,
  } as const
}


//https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/
/*ThunkAction<R, S, E, A extends Action> type is used. It accepts following type arguments:

R stays for return type of the internal function. In the above example, internal function is async function so it returns Promise<void>
S stays for the app state
E is the extension attribute type which is not used
A is type of the action. KnownActions in example above is the union of all possible action types (type KnownActions = Action1 | Action2;)
*/
export const getNextQuestionActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<QuestionsAction>,
  // The type for the data within the last action
  Question,
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  QuestionsAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const nextQuestion = await questionService.loadNextQuestion();
    return dispatch(gotNextQuestionAction(nextQuestion));
  };
};

export function getNextQuestion(nextQuestionid: number) {
  return async (dispatch: any) => {
    try {
      const nextQuestion = await questionService.loadNextQuestionWithId(nextQuestionid);
      dispatch(gotNextQuestionAction(nextQuestion));
    } catch (error) {
      throw error;
    }
  };
}

export function abandonQuestion(userId: string | undefined, currentQuestionId: number) {
  return async (dispatch: any) => {
    try {
      if (userId !== undefined) { //Not PlayWithoutLogin
        await questionService.abandonQuestion(userId, currentQuestionId);
      }

      dispatch(abandonQuestionAction());
    } catch (error) {
      throw error;
    }
  };
}