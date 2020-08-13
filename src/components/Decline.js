import React from 'react';
import * as QueryString from 'query-string';
import { Header } from 'semantic-ui-react';
import { updateWorkshopRegistrant } from '../api/workshopRegistrants-api';
import { useHistory } from 'react-router-dom';

const Decline = (props) => {
  const params = QueryString.parse(props.location.search);
  const email = params.email;
  const wsId = params.wsId;
  const history = useHistory();

  const declineInvite = async () => {
    await updateWorkshopRegistrant(wsId, email, {
      selected: 'Yes',
      declined: 'Yes',
      waitlisted: 'No',
      paid: 'No',
      eligible: 'No',
      paymentId: '',
      payerId: '',
    });

    history.push({
      pathname: '/DeclineSuccess',
    });
  };

  return (
    <div>
      <p />
      <Header as='h2' textAlign='center'>
        Can't Make it?
      </Header>
      <p />
      <Header as='h3' textAlign='center'>
        We understand that circumstances can change or that the dates of the
        workshop may no longer be convenient for you. If you would like to
        decline this invitation please select the Decline button below.
      </Header>
      <p />
      <button align='center' className='ui button' onClick={declineInvite}>
        Decline
      </button>
    </div>
  );
};

export default Decline;
