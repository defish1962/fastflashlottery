import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

const Signup = () => {
  return (
    <AmplifyAuthenticator initialAuthState="signup">
      <AmplifySignUp
        slot="sign-up"
        hideSignIn
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email Address",
            placeholder: "enter your email address",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "create a password",
            required: true,
          },
          {
            type: "given_name",
            label: "First Name",
            placeholder: "Enter your first (given) name",
            required: true,
          },
          {
            type: "family_name",
            label: "Last Name",
            placeholder: "Enter your last (family) name",
            required: true,
          },
        ]}
      />
    </AmplifyAuthenticator>
  );
};

export default Signup;
