import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, Dropdown, Input } from "semantic-ui-react";
import { getWorkshops } from "../api/workshops-api";
import { apiEndpoint } from "../config";

const LotteryForm = () => {
  let workshops = [];
  const lotteryWinners = [];
  const [workshop, setWorkshop] = useState("");
  const [classSize, setClassSize] = useState("");

  const RunLottery = (workshopId) => {
    const [lottery, setLottery] = useState([{}]);

    useEffect(() => {
      (async () => {
        const response = await axios.get(
          `${apiEndpoint}/wsRegistrants/${workshop}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLottery(response.data.items);
      })(workshopId);
    }, [workshopId]);

    console.log(lottery);
    return lottery;
  };

  //const runLottery = () => {
  //   function RunLottery() {
  //     const lotteryMembers = useLottery(workshop);
  //     console.log(lotteryMembers);
  //     // Choose lottery winners
  //     for (let i = 0; i < classSize; i++) {
  //       let selected = Math.floor(Math.random() * lotteryMembers.length);
  //       let winner = lotteryMembers.splice(selected, 1);
  //       lotteryWinners.push(winner[0]);
  //     }
  //     console.log(lotteryWinners);
  //   }

  const getWorkshopsList = async () => {
    const workshopsReturned = await getWorkshops();
    workshopsReturned.forEach((workshop) => {
      let entry = {};
      entry.key = workshop.workshopId;
      entry.text =
        workshop.workshopId +
        " " +
        workshop.workshopName +
        " " +
        workshop.workshopStart;
      entry.value = workshop.workshopId;
      workshops.push(entry);
    });
    console.log(workshops);
  };

  const handleChange = (e, data) => {
    e.preventDefault();
    console.log(data.value);
    setWorkshop(data.value);
  };

  getWorkshopsList();

  return (
    <div>
      <Header as="h3">Lottery Selection</Header>
      <div>
        <Dropdown
          placeholder="Select Workshop"
          onChange={handleChange}
          fluid
          selection
          options={workshops}
        />
        <br />
        <Input
          focus
          placeholder="Number of spaces"
          onChange={(e) => setClassSize(e.target.value)}
        />
        <p />
        <button className="ui primary button" onClick={RunLottery}>
          Run Lottery
        </button>
      </div>
    </div>
  );
};

export default LotteryForm;
