import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndpoint } from '../config';

const useResources = (resource) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async (resource) => {
      const response = await axios.get(`${apiEndpoint}/workshops`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResources(response.data.items);
    })(resource);
  }, [resource]);

  return resources;
};

export default useResources;
