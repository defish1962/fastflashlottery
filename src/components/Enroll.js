import * as React from "react";
import * as QueryString from "query-string";
import { Header } from "semantic-ui-react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { updateWorkshopRegistrant } from "../api/workshopRegistrants-api";
import { useHistory } from "react-router-dom";
import { registrationCompleteEmailConfig } from "../config";
import axios from "axios";
import { apiEndpoint } from "../config";
import { sendEmail } from "../api/email-api";
import { currencyFormat, formatDate } from "../helper";

const Enroll = (props) => {
  const params = QueryString.parse(props.location.search);
  const price = parseInt(params.a);
  const fname = params.fname;
  const email = params.email;
  const wsId = params.wsId;
  let env = "production";
  const history = useHistory();
  let htmlWorkshop = "";

  const client = {
    sandbox:
      "AX2CUDBCrJCXtXEWcsMX0vkU8eBtmPn_Pj0Evq9heWAiYSBOIzarUO_ZTKPKLYNs0P9eFCWAHUJ6V-WY",
    production:
      "AbenOzZY1xCjGfWTQY1DwCzsKP_mFcGryR2XZwLaKtSmwGqHwxP1DuHALLfZclZJooCKsWKCUHzy_iCO",
  };

  const paymentComplete = async (payerId, paymentId) => {
    await updateWorkshopRegistrant(wsId, email, {
      selected: "Yes",
      declined: "No",
      waitlisted: "No",
      paid: "Yes",
      payerId,
      paymentId,
      eligible: "Yes",
    });

    htmlWorkshop = await createSelectedWorkshopHTML(wsId);

    sendRegistrationCompleteEmail(email, fname);

    history.push({
      pathname: "/PaymentSuccess",
      state: {
        email: email,
        workshops: htmlWorkshop,
      },
    });
  };

  const createSelectedWorkshopHTML = async (wsId) => {
    const response = await axios.get(`${apiEndpoint}/workshops/${wsId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let workshop = response.data.items;
    let html = `<ul> * ${workshop.workshopName} 
    ${currencyFormat(workshop.workshopPrice)}
    ${formatDate(workshop.workshopStart)} through 
    ${formatDate(workshop.workshopEnd)}</ul><p>`;
    return html;
  };

  const sendRegistrationCompleteEmail = async (email, fname) => {
    let html = `Dear ${fname}, this email confirms your registration and payment for your Fast Flash Workshop.<p>`;
    html += "You have registered for the following workshop:<p>";
    html += htmlWorkshop;
    html += registrationCompleteEmailConfig.html;
    await sendEmail({
      from: registrationCompleteEmailConfig.from,
      to: email,
      subject: registrationCompleteEmailConfig.subject,
      html: html,
      bcc: registrationCompleteEmailConfig.bcc,
    });
  };

  const onSuccess = (payment) => {
    //console.log('The payment succeeded!', payment);
    paymentComplete(payment.payerID, payment.paymentID);
  };

  const onCancel = (data) => {
    console.log("The payment was cancelled!", data);
  };

  const onError = (err) => {
    console.log("Error!", err);
  };

  return (
    <div className="ui container">
      <p />
      <Header as="h2" textAlign="center">
        Hello {fname}! Please click the button below to make payment and
        complete registration for the Fast Flash Workshop
      </Header>
      <p />
      <Header as="h3" textAlign="center">
        An enrollment confirmation email will be sent to {email}
      </Header>
      <p />
      <div align="center">
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={"USD"}
          total={price}
          shipping="1"
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </div>
      <p />

      <div>
        <p>Fast Flash Workshop</p>
        <p>$199.00</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://checkout.square.site/buy/MSOLBFMLGGHS4LZ7IERGD2LA?src=embed"
        >
          Buy now
        </a>
      </div>
    </div>
  );
};

export default Enroll;
