import * as React from 'react';
import { Header } from 'semantic-ui-react';

const LandingPageSuccess = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <p />
      <Header as='h2' textAlign='center'>
        Congratulations! You are now registered for the Fast Flash Workshops
        Lottery!
      </Header>
      <p />
      <Header as='h3' textAlign='center'>
        You have registered for the following workshop lotteries:
      </Header>
      <p />
      <div
        className='ui-content'
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
      <br />
      <Header as='h3' textAlign='center'>If you do not receive a confirmation email please check your Spam folder, especially if you use GMail.</Header>
      <p />
      <div className='ui container'>
        The lottery will be held after 6 PM ET Tuesday January 26th (11 PM
        GMT Tuesday January 26th) and winners will be notified soon after. If
        you are not chosen you will automatically be placed in the waitlist
        lottery that will be held to fill any remaining spots once the
        registration window closes.
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

export default LandingPageSuccess;
