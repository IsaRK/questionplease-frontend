import { AccountInfo } from "@azure/msal-browser";
import { UserScore } from "../models/leaderboard";
import { getOptions, HttpResponse } from "./serviceHelper";

export interface IUserInfo {
    id: string,
    login: string
}

export interface IUserScore {
    login: string,
    score: number
}

class UserService {

    constructor(accountInfo: AccountInfo) {
        this.homeAccountId = accountInfo.homeAccountId;
    }

    homeAccountId: string;

    url = 'https://questionplease-api.azurewebsites.net/api/user/';

    extractResponse(response: HttpResponse<IUserInfo | null>): IUserInfo | null {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        if (!response.parsedBody) {
            throw new Error("Fetched UserInfo is undefined");
        }

        return response.parsedBody;
    }

    async getLogin(): Promise<IUserInfo | null> {
        try {
            const options = await getOptions("GET");
            const response: HttpResponse<IUserInfo> = await fetch(this.url, options);

            if (response.status === 204)//No content
            {
                return null;
            }

            response.parsedBody = await response.json();
            return this.extractResponse(response);
        }
        catch (ex) {
            throw new Error("Error when fetching UserInfo");
        }
    }

    async createLogin(newLogin: string): Promise<IUserInfo | null> {
        try {
            const options = await getOptions("PUT");
            //var queryParams = new URLSearchParams({ login: newLogin }); >> await fetch(this.url + queryParams, options);
            var completeUrl = new URL(newLogin, this.url);

            const response: HttpResponse<IUserInfo> = await fetch(completeUrl.toString(), options);
            response.parsedBody = await response.json();
            return this.extractResponse(response);
        }
        catch (ex) {
            throw new Error("Error when fetching UserInfo");
        }
    }

    async updateLogin(id: string, newLogin: string): Promise<void> {
        try {
            const options = await getOptions("POST");
            var completeUrl = new URL(this.url);
            completeUrl.pathname = id + "/" + newLogin;

            const response: HttpResponse<IUserInfo> = await fetch(completeUrl.toString(), options);
            response.parsedBody = await response.json();
            this.extractResponse(response);
        }
        catch (ex) {
            throw new Error("Error when fetching UserInfo");
        }
    }

    async getLeaderboard(): Promise<UserScore[]> {
        try {
            const options = await getOptions("GET");
            const response: HttpResponse<IUserScore[]> = await fetch(this.url + "top", options);

            response.parsedBody = await response.json();
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            if (!response.parsedBody) {
                throw new Error("Fetched UserScore array is undefined");
            }

            return response.parsedBody.map(x => new UserScore(x));
        }
        catch (ex) {
            throw new Error("Error when fetching UserScore array");
        }
    }
}

export default UserService;