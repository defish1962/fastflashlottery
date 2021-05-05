import axios from "axios";
import { apiEndpoint } from "../config";

const WorkshopParticipants = (workshopId) => {
  var wsParticipants = [{}];
  let getWSP = async (workshopId) => {
    const response = await axios.get(
      `${apiEndpoint}/wsSelectedRegistrants/${workshopId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    wsParticipants = response.data.items;
    console.log(wsParticipants);
    return wsParticipants;
  };
  return getWSP(workshopId);
};

export default WorkshopParticipants;
