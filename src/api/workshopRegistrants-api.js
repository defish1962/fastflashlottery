import { apiEndpoint } from '../config';
import Axios from 'axios';

export async function createWorkshopRegistrant(newWorkshopRegistrant) {
  const response = await Axios.post(
    `${apiEndpoint}/wsRegistrants`,
    JSON.stringify(newWorkshopRegistrant),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.registrant;
}

export async function updateWorkshopRegistrant(
  workshopId,
  emailAddress,
  workshopRegistrant
) {
  const response = await Axios.patch(
    `${apiEndpoint}/wsRegistrants/${workshopId}/${emailAddress}`,
    JSON.stringify(workshopRegistrant),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.registrant;
}

export async function deleteWorkshopRegistrant(workshopId, emailAddress) {
  try {
    await Axios.delete(
      `${apiEndpoint}/wsRegistrants/${workshopId}/${emailAddress}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
}

export async function getDunningList() {
  const response = await Axios.get(`${apiEndpoint}/dunningList`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data.items;
}
