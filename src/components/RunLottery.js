import React from "react";
import Lottery from "./Lottery";
import {
  updateWorkshopRegistrant,
  deleteWorkshopRegistrant,
  getDunningList,
} from "../api/workshopRegistrants-api";
import { sendEmail } from "../api/email-api";
import {
  winnerEmailConfig,
  waitlistEmailConfig,
  dunningNoticeEmailConfig,
} from "../config";
import {
  getRegistrant,
  getWaitlist,
  updateRegSelected,
} from "../api/registrants-api";
import { getWorkshop, getWorkshops } from "../api/workshops-api";
import { formatDate } from "../helper";

const RunLottery = () => {
  const lotteryNumber = "2";
  const lotteryMembers = Lottery(lotteryNumber);
  const lotteryWinners = [];
  let workshops = [];
  let classSize = 1;
  let price = 0;

  const runLottery = () => {
    //Get list of workshops
    getWorkshopsList();

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
      if (workshop.workshopId !== lotteryNumber) {
        workshops.push(workshop.workshopId);
      }
    });
  };

  const updateWorkshopRegistrants = async () => {
    for (let i = 0; i <= lotteryWinners.length - 1; i++) {
      let email = lotteryWinners[i].emailAddress;
      await updateWorkshopRegistrant(lotteryNumber, email, {
        selected: "Yes",
        declined: "No",
        waitlisted: "No",
        paid: "No",
        eligible: "Yes",
        paymentId: "",
        payerId: "",
      });
      const fName = await registrantInfo(email);

      //Send Email to Lottery Winner
      await sendWinnerEmail(email, fName);

      //Delete other lottery entries for winner
      await deleteWSRegistrant(email);

      //Set Selected Flag on Registrant table for winner
      await updateRegSelected(email);
    }
  };

  const deleteWSRegistrant = async (email) => {
    await getWorkshopsList();
    //Remove other lottery entries for this person
    for (let i = 0; i < workshops.length; i++) {
      await deleteWorkshopRegistrant(workshops[i], email);
    }
  };

  const sendWinnerEmail = async (email, fname) => {
    let declineHtml =
      "<p>Can't Make It?<p>We understand that circumstances can change or that the dates of the workshop may no longer be convenient for you. If you would like to decline this invitation please";
    declineHtml += `<a href=https://www.fastflashworkshops.com/Decline?email=${email}&wsId=${lotteryNumber}&fname=${fname}> Click Here </a>`;
    let html = `Dear ${fname}, great news! Your name was selected for a Fast Flash Workshop!.<p>`;
    html += "You have been selected for the following workshop:<p>";
    html += await workshopInfo(lotteryNumber);
    html += "<p />You can enroll in this workshop by ";
    let enrollmentLink = `<a href=https://www.fastflashworkshops.com/Enroll?email=${email}&wsId=${lotteryNumber}&a=${price}&fname=${fname}>Clicking Here </a>`;
    html += enrollmentLink;
    html += winnerEmailConfig.htmlDeadline;
    html += winnerEmailConfig.html;
    html += declineHtml;
    console.log(html);

    await sendEmail({
      from: winnerEmailConfig.from,
      replyTo: winnerEmailConfig.replyTo,
      to: email,
      subject: winnerEmailConfig.subject,
      html: html,
      bcc: winnerEmailConfig.bcc,
    });
  };

  const dunningNotice = async () => {
    const dunningList = await getDunningList();
    console.log(dunningList);
    for (let i = 0; i < dunningList.length; i++) {
      let wsId = dunningList[i].workshopId;
      let fname = await registrantInfo(dunningList[i].emailAddress);
      await sendDunningEmail(dunningList[i].emailAddress, fname, wsId);
    }
  };

  const sendDunningEmail = async (email, fname, wsId) => {
    let declineHtml =
      "<p>Can't Make It?<p>We understand that circumstances can change or that the dates of the workshop may no longer be convenient for you. If you would like to decline this invitation please";
    declineHtml += `<a href=https://www.fastflashworkshops.com/Decline?email=${email}&wsId=${wsId}&fname=${fname}> Click Here </a>`;
    let html = `Dear ${fname}, just a quick reminder that the deadline for registering for the Fast Flash Workshop is in a few hours.<p>`;
    html += "You have been selected for the following workshop:<p>";
    html += await workshopInfo(wsId);
    html += "<p>You can enroll in this workshop by ";
    let enrollmentLink = `<a href=https://www.fastflashworkshops.com/Enroll?email=${email}&wsId=${wsId}&a=${price}&fname=${fname}>Clicking Here </a>`;
    html += enrollmentLink;
    html += winnerEmailConfig.htmlDeadline;
    html += winnerEmailConfig.html;
    html += declineHtml;
    console.log(html);

    await sendEmail({
      from: dunningNoticeEmailConfig.from,
      replyTo: dunningNoticeEmailConfig.replyTo,
      to: email,
      subject: dunningNoticeEmailConfig.subject,
      html: html,
      bcc: dunningNoticeEmailConfig.bcc,
    });
  };

  // Get Registrant
  const registrantInfo = async (email) => {
    const response = await getRegistrant(email);
    console.log("Registrant Data:", response.firstName);
    return response.firstName;
  };

  // Get Workshop Info
  const workshopInfo = async (lotteryNumber) => {
    const response = await getWorkshop(lotteryNumber);
    let workshopInfo = "<p />" + response.workshopName + " ";
    workshopInfo +=
      formatDate(response.workshopStart) +
      " - " +
      formatDate(response.workshopEnd) +
      "<p />";
    console.log(response);
    price = response.workshopPrice;
    return workshopInfo;
  };

  const waitlistEmail = async () => {
    const waitlist = await getWaitlist();
    waitlist.forEach((member) => {
      sendWaitlistEmail(member.emailAddress, member.firstName);
    });
  };

  const sendWaitlistEmail = async (email, fname) => {
    let html = `<html><head><title>Fast Flash Workshop Waitlist Notification</title></head><body style="font-family: Helvetica;font-size: 16px"><p />Dear ${fname},`;
    html += waitlistEmailConfig.html;
    await sendEmail({
      from: waitlistEmailConfig.from,
      replyTo: waitlistEmailConfig.replyTo,
      to: email,
      subject: waitlistEmailConfig.subject,
      html: html,
      bcc: waitlistEmailConfig.bcc,
    });
  };

  return (
    <div>
      <div>
        <ul>
          {lotteryMembers.map((member) => (
            <li key={member.emailAddress}>{member.emailAddress}</li>
          ))}
        </ul>
      </div>
      <button className="ui primary button" onClick={runLottery}>
        Run Lottery
      </button>
      <p />
      <button className="ui primary button" onClick={updateWorkshopRegistrants}>
        Update Database
      </button>
      <p />
      <button className="ui primary button" onClick={waitlistEmail}>
        Send Email to Waitlist
      </button>
      <p />
      <button className="ui primary button" onClick={dunningNotice}>
        Send Dunning Notices
      </button>
    </div>
  );
};

export default RunLottery;
