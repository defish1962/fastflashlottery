import { apiEndpoint } from '../config';
import Axios from 'axios';

export async function getRegistrant(emailAddress) {
  console.log('Fetching Registrant');

  const response = await Axios.get(
    `${apiEndpoint}/registrants/${emailAddress}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('Registrant:', response.data);
  return response.data.items;
}

export async function createRegistrant(newRegistrant) {
  const response = await Axios.post(
    `${apiEndpoint}/registrants`,
    JSON.stringify(newRegistrant),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.registrant;
}
