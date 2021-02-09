import authService from "../services/auth-service";
import Identity from "./identity";

//Login action identifier
export enum loginActionTypes {
    NETWORK_ERROR = 'network/ERROR',
    SIGN_IN = 'login/SIGNIN',
    SIGNED_IN = 'login/SIGNEDIN',
    SIGN_OUT = 'login/SIGNOUT'
}

export type loginAction =
    | { type: loginActionTypes.NETWORK_ERROR; error: Error }
    | { type: loginActionTypes.SIGN_IN }
    | { type: loginActionTypes.SIGNED_IN, identity: Identity }
    | { type: loginActionTypes.SIGN_OUT }

//Login Action Creator Declaration (il s'agit ici de delegate et non pas de function comme pour les answerActions/questionsActions)
//const loginSignIn = () => ({ type: loginActionTypes.SIGN_IN });
const loginSignedIn = (identity: Identity) => ({ type: loginActionTypes.SIGNED_IN, identity });
const networkError = (error: Error) => ({ type: loginActionTypes.NETWORK_ERROR, error });
//const loginSignOut = () => ({ type: loginActionTypes.SIGN_OUT });

/*
* In each of these action creators, we return a function. 
* The redux-thunk middleware will execute the function asynchronously, and then the various methods will get called. 
* The net result of this is that I only have to dispatch a signIn() action creator to get the authentication service 
* to interactively sign in.
*/

/**
 * Public action for initializing the network module.  Tries to acquire
 * an auth token silently, and swallows an interactive sign-in required.
 * 
 * using redux-thunk for asynchronous action creators. 
 * This allows me to use async/await by returning a function that takes dispatch instead 
 * of the normal action. 

 /**
 * Action for initiating an interactive sign-in.
 */
export function signIn() {
    return async (dispatch: (arg0: { type: loginActionTypes; identity?: Identity; error?: Error; }) => void) => {
        try {
            const identity = await authService.signIn();
            dispatch(loginSignedIn(identity));
        } catch (error) {
            dispatch(networkError(error));
        }
    };
}

/**
 * Action for initiating a sign-out.
 */
export function signOut() {
    return (dispatch: (arg0: { type: loginActionTypes; }) => void) => {
        try {
            authService.signOut();
        } catch (error) {
            dispatch(networkError(error));
        }
    };
}