import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import "./App.css";
import { QuestionComputer } from "./components/QuestionComputer";
import { AnswerForm } from "./components/AnswerForm";
import { makeStyles } from "@material-ui/core/styles";
import AzureAuthenticationButton from "./azure/azure-authentication-component";
import { AccountInfo } from "@azure/msal-browser";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    verticalAlign: "middle",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const App: React.FC = () => {
  // current authenticated user
  const [currentUser, setCurrentUser] = useState<AccountInfo>();

  // authentication callback
  const onAuthenticated = async (userAccountInfo: AccountInfo) => {
    setCurrentUser(userAccountInfo);
  };

  // Render JSON data in readable format
  const PrettyPrintJson = ({ data }: any) => {
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  // Quick link - user revokes app's permission
  const ShowPermissionRevokeLinks = () => {
    return (
      <div>
        <div>
          <a href="https://myapps.microsoft.com" target="_blank" rel="noopener">
            Revoke AAD permission
          </a>
        </div>
        <div>
          <a
            href="https://account.live.com/consent/manage"
            target="_blank"
            rel="noopener"
          >
            Revoke Consumer permission
          </a>
        </div>
      </div>
    );
  };

  return (
    <StyledBox>
      <div id="App">
        <h2>Microsoft Login Button application</h2>
        <AzureAuthenticationButton onAuthenticated={onAuthenticated} />
        {currentUser && (
          <div>
            <PrettyPrintJson data={currentUser} />
            <ShowPermissionRevokeLinks />
          </div>
        )}
      </div>
      <QuestionComputer />
      <AnswerForm />
    </StyledBox>
  );
};

export const StyledBox: React.FunctionComponent = (props) => {
  const styleClass = useStyles();

  return <Box className={styleClass.root}>{props.children}</Box>;
};
