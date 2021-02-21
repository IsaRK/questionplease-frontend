import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import questionService, { IAnswerValidationResult } from "../services/questionService";
import { scoreUpdateActionCreator } from "./loginActions";

export enum answerActionTypes {
    ANSWER_RIGHTANSWER = 'answer/RIGHTANWER',
    ANSWER_WRONGANSWER = 'answer/WRONGANSWER',
}

export type AnswerAction =
    | { type: answerActionTypes.ANSWER_RIGHTANSWER; userAnswer: string, points: number }
    | { type: answerActionTypes.ANSWER_WRONGANSWER; userAnswer: string }

export function gotRightAnswerAction(userAnswer: string, points: number): AnswerAction {
    return {
        type: answerActionTypes.ANSWER_RIGHTANSWER,
        userAnswer: userAnswer,
        points: points
    }
}

export function gotWrongAnswerAction(userAnswer: string): AnswerAction {
    return {
        type: answerActionTypes.ANSWER_WRONGANSWER,
        userAnswer: userAnswer
    }
}

export const validateAnswerActionCreator: ActionCreator<ThunkAction<
    Promise<AnswerAction>, // The type of the last action to be dispatched - will always be promise<T> for async actions
    any, // The type for the data within the last action
    null, // The type of the parameter for the nested function
    AnswerAction // The type of the last action to be dispatched
>> = (userId: string | undefined, questionId: number, userAnswer: string) => {
    return async (dispatch: Dispatch) => {
        if (userId === undefined) {
            throw new Error("Cannot validate answer with undefined userId");
        }

        const answerValidationResult: IAnswerValidationResult = await questionService.validateAnswer(userId, questionId, userAnswer);

        if (answerValidationResult.isValid) {
            dispatch(scoreUpdateActionCreator(answerValidationResult.newScore));
            return dispatch(gotRightAnswerAction(userAnswer, answerValidationResult.points));
        }
        else {
            return dispatch(gotWrongAnswerAction(userAnswer));
        }
    };
};