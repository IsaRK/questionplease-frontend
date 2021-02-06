import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import Identity from '../modules/identity';
import {
    PublicClientApplication,
    AuthenticationResult,
    AccountInfo,
    RedirectRequest,
    PopupRequest,
} from "@azure/msal-browser";

import { MSAL_CONFIG } from "./config";

//From https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial/single-page-application-azure-login-button-sdk-msal
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const isIE = msie > 0 || msie11 > 0;

const logInType = isIE ? "loginRedirect" : "loginPopup";

//From
//https://docs.microsoft.com/fr-fr/azure/active-directory/develop/tutorial-v2-javascript-auth-code
class AuthService {
    private myMSALObj: PublicClientApplication = new PublicClientApplication(
        MSAL_CONFIG
    );
    private account?: AccountInfo;
    private loginRedirectRequest?: RedirectRequest;
    private loginRequest?: PopupRequest;

    public isAuthenticationConfigured = false;

    constructor() {
        // @ts-ignore
        this.account = null;
        this.setRequestObjects();
        if (MSAL_CONFIG?.auth?.clientId) {
            this.isAuthenticationConfigured = true;
        }
    }

    private setRequestObjects(): void {
        this.loginRequest = {
            scopes: [],
            prompt: "select_account",
        };

        this.loginRedirectRequest = {
            ...this.loginRequest,
            redirectStartPage: window.location.href,
        };
    }

    get serviceName() { return 'Microsoft'; }

    get icon() { return faMicrosoft; }

    async signIn(): Promise<Identity> {
        if (logInType === "loginPopup") {
            try {
                const resp = await this.myMSALObj
                    .loginPopup(this.loginRequest);
                return this.handleResponse(resp);
            } catch (err) {
                console.error(err);
                throw err;
            }
        } else if (logInType === "loginRedirect") {
            throw new Error("IE not supported yet");
        } else {
            throw new Error("Not supported login type");
        }
    }

    private handleResponse(response: AuthenticationResult): Identity {
        if (response !== null) {
            this.account = response.account === null ? undefined : response.account;
        } else {
            this.account = this.getAccount();
        }
        return new Identity(this.account);
    }

    private getAccount(): AccountInfo | undefined {
        console.log(`loadAuthModule`);
        const currentAccounts = this.myMSALObj.getAllAccounts();
        if (currentAccounts === null) {
            // @ts-ignore
            console.log("No accounts detected");
            return undefined;
        }

        if (currentAccounts.length > 1) {
            // TBD: Add choose account code here
            // @ts-ignore
            console.log(
                "Multiple accounts detected, need to add choose account code."
            );
            return currentAccounts[0];
        } else if (currentAccounts.length === 1) {
            return currentAccounts[0];
        }
    }

    signOut(): void {
        this.myMSALObj.logout();
    }
}

const authService = new AuthService();

export default authService;