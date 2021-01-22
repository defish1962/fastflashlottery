import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

const Signin = () => {
  return (
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText="Please Sign In"
        slot="sign-in"
        hideSignUp="true"
        handleSubmit={(e) => {
          //e.preventDefault();
          window.location.href = "/";
        }}
      ></AmplifySignIn>
    </AmplifyAuthenticator>
  );
};

export default Signin;
