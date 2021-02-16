import { AccountInfo } from "@azure/msal-browser";
import { HttpResponse } from "../modules/dataLoading";
import { authService } from "./auth-service";

export interface IUserInfo {
    HomeAccountId: string,
    login: string
}

class UserService {

    constructor(accountInfo: AccountInfo) {
        this.homeAccountId = accountInfo.homeAccountId;
    }

    homeAccountId: string;

    url = 'https://questionplease-api.azurewebsites.net/api/user/login';

    async getOptions(verb: string, userInfo: IUserInfo | undefined) {
        const headers = new Headers();
        const token = await authService.getTokenPopup();

        if (!token) {
            throw new Error("Undefined Token");
        }

        const bearer = `Bearer ${token.accessToken}`;
        headers.append("Authorization", bearer);

        if (userInfo) {
            return {
                method: verb,
                headers: headers,
                body: JSON.stringify(userInfo)
            };
        }

        return {
            method: verb,
            headers: headers,
        };
    }

    extractResponse(response: HttpResponse<IUserInfo>): IUserInfo {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        if (!response.parsedBody) {
            throw new Error("Fetched UserInfo is undefined");
        }

        return response.parsedBody;
    }

    async getLogin(): Promise<IUserInfo> {
        try {
            const options = await this.getOptions("GET", undefined);
            const response: HttpResponse<IUserInfo> = await fetch(this.url, options);
            response.parsedBody = await response.json();
            return this.extractResponse(response);
        }
        catch (ex) {
            throw new Error("Error when fetching UserInfo");
        }
    }

    async createLogin(userInfo: IUserInfo): Promise<void> {
        try {
            const options = await this.getOptions("PUT", userInfo);
            const response: HttpResponse<IUserInfo> = await fetch(this.url, options);
            response.parsedBody = await response.json();
            this.extractResponse(response);
        }
        catch (ex) {
            throw new Error("Error when fetching UserInfo");
        }
    }

    async updateLogin(userInfo: IUserInfo): Promise<void> {
        try {
            const options = await this.getOptions("POST", userInfo);
            const response: HttpResponse<IUserInfo> = await fetch(this.url, options);
            response.parsedBody = await response.json();
            this.extractResponse(response);
        }
        catch (ex) {
            throw new Error("Error when fetching UserInfo");
        }
    }
}

export default UserService;