import React from "react";
import Amplify from "aws-amplify";
import { AmplifyGreetings } from "@aws-amplify/ui-react";
import { Button } from "semantic-ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="ui right aligned">
      <AmplifyGreetings
        username={user.attributes.given_name}
      ></AmplifyGreetings>
    </div>
  ) : (
    <Button.Group floated="right">
      <Button
        color="blue"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/Signin";
        }}
      >
        Sign In
      </Button>

      <Button
        color="red"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/Signup";
        }}
      >
        Sign Up
      </Button>
    </Button.Group>
  );
};

export default AuthStateApp;
