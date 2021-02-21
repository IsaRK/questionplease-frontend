import { IUserScore } from "../services/userService";

export type LeaderboardState = {
    TopUsers: UserScore[]
    MinScore: Number
};

export class UserScore {
    constructor(apiScore: IUserScore) {
        this.login = apiScore.login;
        this.score = apiScore.score;
    }

    login: string;
    score: number;

    toString(): string {
        return "[" + this.login + " : " + this.score + "]";
    }
}

export function GetMinScoreOnLeaderboard(topUsers: UserScore[]): number {
    return Math.min(...topUsers.map(item => item.score));
}