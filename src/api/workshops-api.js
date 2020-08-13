import { apiEndpoint } from '../config';
import axios from 'axios';

export async function getWorkshops() {
  const response = await axios.get(`${apiEndpoint}/workshops`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('Workshops-api:', response.data.items);
  return response.data.items;
}

export async function getWorkshop(workshopId) {
  const response = await axios.get(
    `https://${apiEndpoint}/workshops/${workshopId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.items;
}

export async function createWorkshop(idToken, newWorkshop) {
  const response = await axios.post(
    `${apiEndpoint}/workshops`,
    JSON.stringify(newWorkshop),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.workshop;
}

export async function deleteWorkshop(idToken, workshopId) {
  await axios.delete(`${apiEndpoint}/workshops/${workshopId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
}

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { apiEndpoint } from '../config';

// const useResources = (resource) => {
//   const [resources, setResources] = useState([]);

//   useEffect(() => {
//     (async (resource) => {
//       const response = await axios.get(`${apiEndpoint}/workshops`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       setResources(response.data.items);
//     })(resource);
//   }, [resource]);

//   return resources;
// };

// export default useResources;
