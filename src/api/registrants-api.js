import { apiEndpoint } from '../config';
import axios from 'axios';

export async function getRegistrant(emailAddress) {
  const response = await axios.get(
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
  const response = await axios.post(
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

export async function getWaitlist() {
  const response = await axios.get(`${apiEndpoint}/waitlist`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data.items);
  return response.data.items;
}

export async function updateRegSelected(emailAddress) {
  const response = await axios.patch(
    `${apiEndpoint}/registrants/${emailAddress}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.registrant;
}
