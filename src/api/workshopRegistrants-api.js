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
