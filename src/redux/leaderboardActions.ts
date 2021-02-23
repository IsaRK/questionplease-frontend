import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import Identity from "../models/identity";
import { GetMinScoreOnLeaderboard, UserScore } from "../models/leaderboard";
import UserService from "../services/userService";
import { loginSetActionCreator } from "./loginActions";

export enum leaderboardActionTypes {
    LEADERBOARD_SET = 'leaderboard/SET',
}

export type leaderboardAction =
    | { type: leaderboardActionTypes.LEADERBOARD_SET; topUsers: UserScore[], minScore: number }

export const leaderboardSetActionCreator = (topUsers: UserScore[], minScore: number) =>
    ({ type: leaderboardActionTypes.LEADERBOARD_SET, topUsers, minScore });

export function finalizeSetLogin(identity: Identity) {
    return async function (dispatch: any) {
        dispatch(loginSetActionCreator(identity));
        dispatch(updateLeaderboard(identity));
    }
}

/*
export const updateLeaderboardActionCreator: ActionCreator<ThunkAction<
    Promise<any>, // The type of the last action to be dispatched - will always be promise<T> for async actions
    any, // The type for the data within the last action
    null, // The type of the parameter for the nested function
    leaderboardAction // The type of the last action to be dispatched
>> = (identity: Identity) => {
    return async (dispatch: Dispatch) => {
        return updateLeaderboard(identity);
    };
};
*/

export function updateLeaderboard(identity: Identity) {
    return async function (dispatch: any) {
        const { topUsers, minScore } = await getLearderbord(identity);
        return dispatch(leaderboardSetActionCreator(topUsers, minScore));
    }
}

export async function getLearderbord(identity: Identity) {
    const topUsers = await identity.getLeaderboard();
    const minScore = GetMinScoreOnLeaderboard(topUsers);
    return { topUsers, minScore };
}

export function updateLeaderboardWithoutLogin() {
    return async function (dispatch: any) {
        const userService = new UserService("");
        const topUsers = await userService.getLeaderboard();
        const minScore = GetMinScoreOnLeaderboard(topUsers);
        return dispatch(leaderboardSetActionCreator(topUsers, minScore));
    }
}