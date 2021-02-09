/*
const AzureActiveDirectoryAppClientId: any =
  process.env.REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID;

export const MSAL_CONFIG = {
  "msal": {
    "authority": "https://login.microsoftonline.com/common",
    "clientId": AzureActiveDirectoryAppClientId,
    "scopes": ["openid", "profile", "user.read"]
  }
}
*/

import { Configuration, LogLevel } from "@azure/msal-browser";

const AzureActiveDirectoryAppClientId: any =
  process.env.REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID;

const AzureActiveDirectoryRedirectUri: any =
  process.env.REACT_APP_AZURE_ACTIVE_DIRECTORY_REDIRECT_URI;

/* 
reads your application ID in from the .env file
sets session as the browser storage instead of cookies
provides logging that is considerate of personal information.
*/

export const MSAL_CONFIG: Configuration = {
  auth: {
    clientId: AzureActiveDirectoryAppClientId,
    redirectUri: AzureActiveDirectoryRedirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

//To get the token for a protected API, see this tutorial:
//https://docs.microsoft.com/fr-fr/azure/active-directory/develop/tutorial-v2-javascript-auth-code

