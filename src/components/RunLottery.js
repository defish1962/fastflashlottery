import React from 'react';
import Lottery from './Lottery';
import { Button } from 'semantic-ui-react';
import { updateWorkshopRegistrant } from '../api/workshopRegistrants-api';
import { sendEmail } from '../api/email-api';
import { winnerEmailConfig } from '../config';
import { getRegistrant } from '../api/registrants-api';
import { getWorkshop } from '../api/workshops-api';
import { formatDate } from '../helper';

const RunLottery = () => {
  const lotteryNumber = '1';
  const lotteryMembers = Lottery(lotteryNumber);
  const lotteryWinners = [];
  let classSize = 2;
  let price = 0;

  const runLottery = () => {
    // Choose lottery winners
    for (let i = 0; i < classSize; i++) {
      let selected = Math.floor(Math.random() * lotteryMembers.length);
      let winner = lotteryMembers.splice(selected, 1);
      lotteryWinners.push(winner[0]);
    }
    console.log(lotteryWinners);
  };

  const updateWorkshopRegistrants = async () => {
    for (let i = 0; i <= lotteryWinners.length - 1; i++) {
      let email = lotteryWinners[i].emailAddress;
      await updateWorkshopRegistrant(lotteryNumber, email, {
        selected: 'Yes',
        declined: 'No',
        waitlisted: 'No',
        paid: 'No',
        eligible: 'Yes',
        paymentId: '',
        payerId: '',
      });
      const fName = await registrantInfo(email);
      sendWinnerEmail(email, fName);
    }
  };

  const sendWinnerEmail = async (email, fname) => {
    let declineHtml =
      "<p />Can't Make It?<p />We understand that circumstances can change or that the dates of the workshop may no longer be convenient for you. If you would like to decline this invitation please";
    declineHtml += `<a href=https://www.fastflashworkshops.com/Decline?email=${email}&wsId=${lotteryNumber}&fname=${fname}> Click Here </a>`;
    let html = `Dear ${fname}, great news! Your name was selected for a Fast Flash Workshop!.<p>`;
    html += 'You have been selected for the following workshop:<p>';
    html += await workshopInfo(lotteryNumber);
    html += '<p />You can enroll in this workshop by ';
    let enrollmentLink = `<a href=https://www.fastflashworkshops.com/Enroll?email=${email}&wsId=${lotteryNumber}&a=${price}&fname=${fname}>Clicking Here </a>`;
    html += enrollmentLink;
    html += winnerEmailConfig.html;
    html += declineHtml;
    console.log(html);

    await sendEmail({
      from: winnerEmailConfig.from,
      to: email,
      subject: winnerEmailConfig.subject,
      html: html,
      bcc: winnerEmailConfig.bcc,
    });
  };

  // Get Registrant
  const registrantInfo = async (email) => {
    const response = await getRegistrant(email);
    console.log('Registrant Data:', response.firstName);
    return response.firstName;
  };

  // Get Workshop Info
  const workshopInfo = async (lotteryNumber) => {
    const response = await getWorkshop(lotteryNumber);
    let workshopInfo = '<p />' + response.workshopName + ' ';
    workshopInfo +=
      formatDate(response.workshopStart) +
      ' - ' +
      formatDate(response.workshopEnd) +
      '<p />';
    console.log(response);
    price = response.workshopPrice;
    return workshopInfo;
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
      <Button onClick={runLottery} label='Run Lottery' />
      <br />
      <Button onClick={updateWorkshopRegistrants} label='Update Database' />
      <br />
      <Button onClick={sendWinnerEmail} label='Send Email to Winners' />
      <p />
    </div>
  );
};
export default RunLottery;
