/**
 * Following this tuto : https://adrianhall.github.io/javascript/react/2020/03/06/msal-react-redux/
 * Encapsulation of the identity of the user.
 */

import { AccountInfo } from "@azure/msal-browser";
import UserService, { IUserInfo } from "../services/userService";
import { UserScore } from "./leaderboard";

export type LoginState = {
    Identity: Identity | null
    LastError: Error | null
    IsLogged: boolean
    Score: Number
    PlayWithoutLogin: boolean
};

export default class Identity {
    account: AccountInfo | undefined;
    login: string | undefined;
    id: string | undefined;
    score: number;
    userService: UserService;

    constructor(accountInfo: AccountInfo, login: string | undefined, id: string | undefined, score: number) {
        this.account = accountInfo;
        this.userService = new UserService(accountInfo.homeAccountId);
        this.login = login;
        this.id = id;
        this.score = score;
    }

    async getUserInfo(): Promise<IUserInfo | null> {
        if (!this.account) {
            throw new Error("Unable to retrieve account");
        }

        return this.userService.getLogin();
    }

    async createLogin(newLogin: string): Promise<Identity> {
        const userInfo = await this.userService.createLogin(newLogin);

        if (userInfo === null) {
            throw new Error("UserInfo should not be null when creating a login");
        }

        //Several ways to clone an object in TypeScript
        //https://stackoverflow.com/questions/28150967/typescript-cloning-object
        const newIdentity = Object.create(this);
        newIdentity.login = userInfo.login;
        newIdentity.id = userInfo.id;
        newIdentity.score = userInfo.score;
        return newIdentity;
    }

    async updateLogin(newLogin: string) {
        if (this.id === undefined) {
            throw new Error("Unable to update login with undefined Id");
        }

        await this.userService.updateLogin(this.id, newLogin);
        const updatedIdentity = Object.create(this);
        updatedIdentity.login = newLogin;

        return updatedIdentity;
    }

    async getLeaderboard(): Promise<UserScore[]> {
        return this.userService.getLeaderboard();
    }
}