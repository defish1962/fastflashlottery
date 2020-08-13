import * as React from 'react';
import { Header } from 'semantic-ui-react';

const PaymentSuccess = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <p />
      <Header as='h2' textAlign='center'>
        Congratulations! You are now enrolled in your Fast Flash Workshop!
      </Header>
      <p />
      <Header as='h3' textAlign='center'>
        You have registered for the following workshop:
      </Header>
      <p />
      <div
        className='ui-content'
        align='center'
        dangerouslySetInnerHTML={{
          __html: props.history.location.state.workshops,
        }}
      ></div>
      <p />
      <Header as='h3' textAlign='center'>
        A confirmation email will be sent to
        <br />
        {props.history.location.state.email}
      </Header>
      <p />
      <div className='ui container'>
        As the start date for your workshop draws closer you will receive an
        email with instructions on how to access the workshop. I look forward to
        working with you.
      </div>
      <div className='ui container'>
        <p />
        Thanks so much!
        <p />
        Kathy
        <p />
      </div>
    </React.Fragment>
  );
};

export default PaymentSuccess;
