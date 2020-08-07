import { apiEndpoint } from '../config';
import Axios from 'axios';

export async function sendEmail(newEmail) {
  const response = await Axios.post(
    `${apiEndpoint}/nodemailer`,
    JSON.stringify(newEmail),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.nodemailer;
}
