import * as React from "react";
import { Header } from "semantic-ui-react";

const EmailSuccess = (props) => {
  let ccEmails = props.history.location.state.emails;
  console.log(ccEmails);
  const emails = ccEmails.map((email) => {
    return <li key={email}>{email}</li>;
  });

  console.log("Emails:", emails);

  return (
    <React.Fragment>
      <p />
      <Header as="h2" textAlign="center">
        Email sent to the following people:
      </Header>
      <p />
      <div>
        <ul>{emails}</ul>
      </div>
    </React.Fragment>
  );
};

export default EmailSuccess;
