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

export function updateLeaderboard(identity: Identity) {
    return async function (dispatch: any) {
        const { topUsers, minScore } = await getLearderbordFromIdentity(identity);
        dispatch(leaderboardSetActionCreator(topUsers, minScore));
    }
}

export async function getLearderbordFromIdentity(identity: Identity): Promise<any> {
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