import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import {
    PublicClientApplication,
    AuthenticationResult,
    AccountInfo,
    SilentRequest,
    EndSessionRequest,
    InteractionRequiredAuthError,
} from "@azure/msal-browser";

import { loginRequest, MSAL_CONFIG } from "./config";

//From
//https://docs.microsoft.com/fr-fr/azure/active-directory/develop/tutorial-v2-javascript-auth-code
class AuthService {

    constructor() {
        this.currentAccount = null;
    }

    private myMSALObj: PublicClientApplication = new PublicClientApplication(
        MSAL_CONFIG
    );

    currentAccount: AccountInfo | null;

    setCurrentAccount(): AccountInfo | undefined {
        // See here for more info on account retrieval:
        // https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
        const currentAccounts = this.myMSALObj.getAllAccounts();
        if (currentAccounts === null) {
            return;
        } else if (currentAccounts.length > 1) {
            // Add choose account code here
            console.warn("Multiple accounts detected.");
        } else if (currentAccounts.length === 1) {
            return currentAccounts[0];
        }
    }

    handleResponse(resp: AuthenticationResult) {
        if (resp !== null) {
            this.currentAccount = resp.account;
        } else {
            this.setCurrentAccount();
        }
    }

    signIn() {
        return this.myMSALObj.loginPopup(loginRequest)
            .then((resp) => this.handleResponse(resp)) //this.handleResponse.bind(this)
            .catch(error => {
                console.error(error);
            });
    }

    signOut() {
        if (this.currentAccount === null) {
            throw new Error("Current Account is null");
        }

        const logoutRequest: EndSessionRequest = {
            account: this.currentAccount
        };

        return this.myMSALObj.logout(logoutRequest);
    }

    getTokenPopup(): Promise<void | AuthenticationResult | undefined> {
        // See here for more info on account retrieval:
        //https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md

        const silentRequest: SilentRequest = {
            account: this.currentAccount === null ? undefined : this.currentAccount,
            scopes: loginRequest.scopes
        }

        return this.myMSALObj.acquireTokenSilent(silentRequest)
            .catch(error => {
                console.warn("silent token acquisition fails. acquiring token using redirect");
                if (error instanceof InteractionRequiredAuthError) {
                    // fallback to interaction when silent call fails
                    return this.myMSALObj.acquireTokenPopup(silentRequest).then(tokenResponse => {
                        console.log(tokenResponse);

                        return tokenResponse;
                    }).catch(error => {
                        console.error(error);
                    });
                } else {
                    console.warn(error);
                }
            });
    }

    get serviceName() { return 'Microsoft'; }

    get icon() { return faMicrosoft; }
}

export const authService = new AuthService();