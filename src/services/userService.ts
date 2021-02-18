import { AccountInfo } from "@azure/msal-browser";
import { STATUS_CODES } from "http";
import { HttpResponse } from "../modules/dataLoading";
import { authService } from "./auth-service";

export interface IUserInfo {
    id: number,
    login: string
}

class UserService {

    constructor(accountInfo: AccountInfo) {
        this.homeAccountId = accountInfo.homeAccountId;
    }

    homeAccountId: string;

    url = 'https://questionplease-api.azurewebsites.net/api/user/';

    async getOptions(verb: string) {
        const headers = new Headers();
        const token = await authService.getTokenPopup();

        if (!token) {
            throw new Error("Undefined Token");
        }

        const bearer = `Bearer ${token.accessToken}`;
        headers.append("Authorization", bearer);

        /*
        if (userInfo) {
            return {
                method: verb,
                headers: headers,
                body: JSON.stringify(userInfo)
            };
        }
        */

        return {
            method: verb,
            headers: headers,
        };
    }

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
            const options = await this.getOptions("GET");
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
            const options = await this.getOptions("PUT");
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

    async updateLogin(id: number, newLogin: string): Promise<void> {
        try {
            const options = await this.getOptions("POST");
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
}

export default UserService;