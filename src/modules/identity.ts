/**
 * Following this tuto : https://adrianhall.github.io/javascript/react/2020/03/06/msal-react-redux/
 * Encapsulation of the identity of the user.
 */

import { AccountInfo } from "@azure/msal-browser";
import UserService, { IUserInfo } from "../services/userService";

export type LoginState = {
    Identity: Identity | null
    LastError: Error | null
};

export default class Identity {
    account: AccountInfo | undefined;
    login: string | undefined;
    userService: UserService;

    constructor(accountInfo: AccountInfo, login: string | undefined) {
        this.account = accountInfo;
        this.userService = new UserService(accountInfo);
        this.login = login;
    }

    async getUserInfo(): Promise<IUserInfo> {
        if (!this.account) {
            throw new Error("Unable to retrieve account");
        }

        return this.userService.getLogin();
    }

    async createLogin(newLogin: string) {
        await this.userService.createLogin(this.userInfo(newLogin));
        this.login = newLogin;
        return this;
    }

    async updateLogin(newLogin: string) {
        await this.userService.updateLogin(this.userInfo(newLogin));
        this.login = newLogin;
        return this;
    }

    userInfo = (login: string): IUserInfo => {
        if (this.account?.homeAccountId) {
            return { HomeAccountId: this.account?.homeAccountId, login }

        }
        throw new Error("Unable to find homeAccountId");
    }
}