import * as React from 'react';
import { Header } from 'semantic-ui-react';

const DeclineSuccess = () => {
  return (
    <React.Fragment>
      <p />
      <Header as='h2' textAlign='center'>
        Thanks for letting us know.
      </Header>
      <p />
      <Header as='h3' textAlign='center'>
        We hope you'll be able to take a Fast Flash Workshop at some point in
        the future
      </Header>
    </React.Fragment>
  );
};

export default DeclineSuccess;
