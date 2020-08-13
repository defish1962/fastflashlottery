import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndpoint } from '../config';

const Lottery = (workshopId) => {
  const [lottery, setLottery] = useState([{}]);

  useEffect(() => {
    (async (workshopId) => {
      const response = await axios.get(
        `${apiEndpoint}/wsRegistrants/${workshopId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setLottery(response.data.items);
    })(workshopId);
  }, [workshopId]);

  console.log(lottery);
  return lottery;
};

export default Lottery;
