/**
 * Following this tuto : https://adrianhall.github.io/javascript/react/2020/03/06/msal-react-redux/
 * Encapsulation of the identity of the user.
 */

import { AccountInfo } from "@azure/msal-browser";

export type LoginState = {
    Identity: Identity | null
    LastError: Error | null
};

export default class Identity {
    account: AccountInfo | undefined;

    constructor(accountInfo: AccountInfo | undefined) {
        this.account = accountInfo;
    }

    get userId() {
        if (this.account) return this.account.homeAccountId;
        else return null;
    }

    get name() {
        if (this.account) return this.account.name;
        else return null;
    }
}