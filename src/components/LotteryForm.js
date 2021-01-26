import React, { useState } from "react";
import Lottery from "./Lottery";
import { Header, Dropdown, Input } from "semantic-ui-react";
import { getWorkshops } from "../api/workshops-api";

const LotteryForm = () => {
  let workshops = [];
  const lotteryWinners = [];
  const [workshop, setWorkshop] = useState("");
  const [classSize, setClassSize] = useState("");

  const RunLottery = () => {
    console.log(workshop);
    const lotteryMembers = Lottery(workshop);
    console.log(lotteryMembers);
    // Choose lottery winners
    for (let i = 0; i < classSize; i++) {
      let selected = Math.floor(Math.random() * lotteryMembers.length);
      let winner = lotteryMembers.splice(selected, 1);
      lotteryWinners.push(winner[0]);
    }
    console.log(lotteryWinners);
  };

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

  getWorkshopsList();

  const handleWorkshopSelectionChange = (e, { value }) => {
    setWorkshop({ value });
  };

  return (
    <div>
      <Header as="h3">Lottery Selection</Header>
      <div>
        <Dropdown
          id="selectedWorkshop"
          placeholder="Select Workshop"
          fluid
          selection
          onChange={handleWorkshopSelectionChange}
          //onChange={(e, data) => setWorkshop(data.value)}
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
