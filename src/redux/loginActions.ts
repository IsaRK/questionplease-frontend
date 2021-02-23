import { AccountInfo } from "@azure/msal-browser";
import { authService } from "../services/authService";
import Identity from "../models/identity";
import { finalizeSetLogin } from "./leaderboardActions";

//Login action identifier
export enum loginActionTypes {
    NETWORK_ERROR = 'network/ERROR',
    SIGNED_IN = 'login/SIGNEDIN',
    SIGN_OUT = 'login/SIGNOUT',
    LOGINSET = 'login/LOGINSET',
    SCOREUPDATE = 'login/SCOREUPDATE',
    PLAYWITHOUTLOGIN = 'login/PLAYWITHOUTLOGIN'
}

export type loginAction =
    | { type: loginActionTypes.NETWORK_ERROR; error: Error }
    | { type: loginActionTypes.SIGNED_IN, identity: Identity }
    | { type: loginActionTypes.SIGN_OUT }
    | { type: loginActionTypes.LOGINSET, identity: Identity }
    | { type: loginActionTypes.SCOREUPDATE, newScore: number }
    | { type: loginActionTypes.PLAYWITHOUTLOGIN }

//Login Action Creator Declaration (il s'agit ici de delegate et non pas de function comme pour les answerActions/questionsActions)
const signedInActionCreator = (identity: Identity) => ({ type: loginActionTypes.SIGNED_IN, identity });
const networkError = (error: Error) => ({ type: loginActionTypes.NETWORK_ERROR, error });
const signOutActionCreator = () => ({ type: loginActionTypes.SIGN_OUT });
export const loginSetActionCreator = (identity: Identity) => ({ type: loginActionTypes.LOGINSET, identity });
export const scoreUpdateActionCreator = (newScore: number) => ({ type: loginActionTypes.SCOREUPDATE, newScore });
export const setPlayWithoutLoginActionCreator = () => ({ type: loginActionTypes.PLAYWITHOUTLOGIN });

//Thunk SignIn
export function signIn() {
    return async (dispatch: any) => {
        try {
            await authService.signIn();

            if (authService.currentAccount) {
                setNewIdentity(dispatch, authService.currentAccount);
            }
            else {
                throw new Error("Unable to retrieve identity")
            }

        } catch (error) {
            dispatch(networkError(error));
        }
    };
}

export async function setNewIdentity(dispatch: any, accountInfo: AccountInfo) {
    const result = new Identity(accountInfo, undefined, undefined, 0);
    try {
        const userInfo = await result.getUserInfo();
        if (userInfo !== null) {
            result.login = userInfo.login;
            result.id = userInfo.id;
            result.score = userInfo.score;
            dispatch(finalizeSetLogin(result));
        }
        else {
            dispatch(signedInActionCreator(result));
        }

    } catch (error) {
        dispatch(networkError(error));
    }
}

//Thunk SignOut
export function signOut() {
    return async (dispatch: (arg0: { type: loginActionTypes }) => void) => {
        try {
            await authService.signOut();
            dispatch(signOutActionCreator());
        } catch (error) {
            dispatch(networkError(error));
        }
    };
}

export function setLoginAction(newLogin: string, currentIdentity: Identity) {
    return async function (dispatch: any) {

        try {
            if (currentIdentity == null) {
                throw new Error("Current Identity is null");
            }

            let newIdentity: Identity;
            if (!currentIdentity.login === undefined) {
                newIdentity = await currentIdentity.updateLogin(newLogin);
            } else {
                newIdentity = await currentIdentity.createLogin(newLogin);
            }
            await dispatch(finalizeSetLogin(newIdentity));
        }
        catch (error) {
            dispatch(networkError(error));
        }
    };
}