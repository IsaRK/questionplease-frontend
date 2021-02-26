import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import Identity from "../models/identity";
import questionService, { IAnswerValidationResult } from "../services/questionService";
import { getLearderbordFromIdentity, leaderboardSetActionCreator } from "./leaderboardActions";
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
>> = (identity: Identity | null, questionId: number, userAnswer: string, oldScore: number, minScore: number) => {
    return async (dispatch: Dispatch) => {
        const answerValidationResult: IAnswerValidationResult = await questionService.validateAnswer(identity?.id, questionId, userAnswer);

        if (answerValidationResult.isValid) {

            let newScore;
            if (identity === null) {
                newScore = oldScore + answerValidationResult.points;
            }
            else {
                newScore = answerValidationResult.newScore;
            }

            dispatch(scoreUpdateActionCreator(newScore));

            if (newScore >= minScore && identity !== null) {
                const { topUsers, minScore } = await getLearderbordFromIdentity(identity);
                dispatch(leaderboardSetActionCreator(topUsers, minScore));
            }

            return dispatch(gotRightAnswerAction(userAnswer, answerValidationResult.points));
        }
        else {
            return dispatch(gotWrongAnswerAction(userAnswer));
        }
    };
};