import { authService } from "../services/auth-service";
import Identity from "./identity";

//Login action identifier
export enum loginActionTypes {
    NETWORK_ERROR = 'network/ERROR',
    SIGNED_IN = 'login/SIGNEDIN',
    SIGN_OUT = 'login/SIGNOUT'
}

export type loginAction =
    | { type: loginActionTypes.NETWORK_ERROR; error: Error }
    | { type: loginActionTypes.SIGNED_IN, identity: Identity }
    | { type: loginActionTypes.SIGN_OUT }

//Login Action Creator Declaration (il s'agit ici de delegate et non pas de function comme pour les answerActions/questionsActions)
const loginSignedIn = (identity: Identity) => ({ type: loginActionTypes.SIGNED_IN, identity });
const networkError = (error: Error) => ({ type: loginActionTypes.NETWORK_ERROR, error });
const loginSignOut = () => ({ type: loginActionTypes.SIGN_OUT });

/**
* Action for initiating an interactive sign-in.
*/
export function signIn() {
    return async (dispatch: (arg0: { type: loginActionTypes; identity?: Identity; error?: Error; }) => void) => {
        try {
            await authService.signIn();

            if (authService.currentAccount) {
                let identity = new Identity(authService.currentAccount);
                dispatch(loginSignedIn(identity));
            }
            else {
                throw new Error("Unable to retrieve identity")
            }

        } catch (error) {
            dispatch(networkError(error));
        }
    };
}

/**
 * Action for initiating a sign-out.
 */
export function signOut() {
    return async (dispatch: (arg0: { type: loginActionTypes }) => void) => {
        try {
            await authService.signOut();
            dispatch(loginSignOut());
        } catch (error) {
            dispatch(networkError(error));
        }
    };
}