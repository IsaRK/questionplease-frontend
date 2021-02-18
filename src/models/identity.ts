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
    id: number | undefined;
    userService: UserService;

    constructor(accountInfo: AccountInfo, login: string | undefined, id: number | undefined) {
        this.account = accountInfo;
        this.userService = new UserService(accountInfo);
        this.login = login;
        this.id = id;
    }

    async getUserInfo(): Promise<IUserInfo | null> {
        if (!this.account) {
            throw new Error("Unable to retrieve account");
        }

        return this.userService.getLogin();
    }

    async createLogin(newLogin: string) {
        const userInfo = await this.userService.createLogin(newLogin);

        if (userInfo === null) {
            throw new Error("UserInfo should not be null when creating a login");
        }

        return { ...this, login: userInfo.login, id: userInfo.id }
    }

    async updateLogin(newLogin: string) {
        if (this.id === undefined) {
            throw new Error("Unable to update login with undefined Id");
        }

        await this.userService.updateLogin(this.id, newLogin);
        return { ...this, login: newLogin }
    }
}