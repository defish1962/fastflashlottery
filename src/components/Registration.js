import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import EmailValidator from "email-validator";
import { apiEndpoint } from "../config";
import {
  Checkbox,
  Form,
  Input,
  Label,
  Grid,
  Header,
  Container,
} from "semantic-ui-react";
import { emailConfig } from "../config";
import { sendEmail } from "../api/email-api";
import { createRegistrant } from "../api/registrants-api";
import { createWorkshopRegistrant } from "../api/workshopRegistrants-api";
import { currencyFormat, formatDate } from "../helper";

const Registration = () => {
  const [workshops, setWorkshops] = useState([{}]);
  const [emailAddress, setEmailAddress] = useState("");
  const [confirmEmailAddress, setConfirmEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  // const [phoneNumberError, setPhoneNumberError] = useState('');
  const [workshopsError, setWorkshopsError] = useState("");
  const workshopsSelected = [];
  const history = useHistory();
  let htmlWorkshops = "";
  let formValid = true;

  useState(() => {
    (async () => {
      const response = await axios.get(`${apiEndpoint}/workshops`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setWorkshops(response.data.items);
    })();
  });

  const createWorkshopsEntries = () => {
    workshopsSelected.forEach((wsId) => {
      onWSRegistrantCreate(wsId);
    });
  };

  const createSelectedWorkshopsList = () => {
    let result = workshops.map((workshop) => {
      if (workshopsSelected.includes(workshop.workshopId)) {
        return `<ul> * ${workshop.workshopName} 
          ${currencyFormat(workshop.workshopPrice)}
          ${formatDate(workshop.workshopStart)} through 
          ${formatDate(workshop.workshopEnd)}</ul><p>`;
      } else {
        return null;
      }
    });
    return result.join("");
  };

  const onWSRegistrantCreate = async (wsId) => {
    try {
      await createWorkshopRegistrant({
        workshopId: wsId,
        emailAddress: emailAddress,
        paid: "No",
        selected: "No",
        waitlisted: "No",
        declined: "No",
      });
    } catch {
      alert("Could not creat Workshop Registrant entries");
    }
  };

  const sendMail = async () => {
    htmlWorkshops = createSelectedWorkshopsList();
    let html = `Dear ${firstName}, this email confirms your enrollment in the Fast Flash Workshops lottery.<p>`;
    html += "You have registered for the following workshop lotteries:<p>";
    html += htmlWorkshops;
    html += emailConfig.html;
    await sendEmail({
      from: emailConfig.from,
      to: emailAddress,
      subject: emailConfig.subject,
      html: html,
      bcc: emailConfig.bcc,
    });
  };

  const onRegistrantCreate = async () => {
    try {
      await createRegistrant({
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        // phoneNumber: phoneNumber,
      });

      //Add workshop entries for registrant
      createWorkshopsEntries();

      //Send Confirmation email
      sendMail();

      history.push({
        pathname: "/LandingPageSuccess",
        state: {
          email: emailAddress,
          workshops: htmlWorkshops,
        },
      });
    } catch {
      alert("Oh oh! Looks like something went wrong. Please try again");
    }
  };

  const manageWorkshopsList = (wsId) => {
    let pos = workshopsSelected.indexOf(wsId);
    if (pos >= 0) {
      workshopsSelected.splice(pos, 1);
    } else {
      workshopsSelected.push(wsId);
    }
  };

  const displayWorkshops = () => {
    return workshops.map((workshop) => {
      return (
        <Grid.Row key={workshop.workshopId}>
          <Grid.Column width="5">
            <Checkbox
              label={workshop.workshopName}
              onClick={(e) => {
                manageWorkshopsList(workshop.workshopId);
              }}
            />
          </Grid.Column>
          <Grid.Column width="2">
            {" "}
            {currencyFormat(workshop.workshopPrice)}
          </Grid.Column>
          <Grid.Column width="6">
            {formatDate(workshop.workshopStart)} -{" "}
            {formatDate(workshop.workshopEnd)}
          </Grid.Column>
        </Grid.Row>
      );
    });
  };

  const ValidateForm = () => {
    formValid = true;

    // Email address has been entered and is correct format
    if (emailAddress === "") {
      setEmailError("Please provide a valid email address");
      formValid = false;
    }
    if (!EmailValidator.validate(emailAddress)) {
      setEmailError("Please provide a valid email address");
      formValid = false;
    } else {
      setEmailError("");
    }

    if (emailAddress !== confirmEmailAddress) {
      setConfirmEmailError(
        "Confirmation Email Address does not match email address"
      );
      formValid = false;
    } else {
      setConfirmEmailError("");
    }

    // First Name Entered
    if (firstName.length < 1) {
      setFirstNameError("Please provide a first name");
      formValid = false;
    } else {
      setFirstNameError("");
    }

    // Last Name Entered
    if (lastName.length < 1) {
      setLastNameError("Please provide a last name");
      formValid = false;
    } else {
      setLastNameError("");
    }

    //Phone Number is long enough
    // if (phoneNumber.length > 0) {
    //   if (phoneNumber.length < 11) {
    //     setPhoneNumberError(
    //       'Phone number must be at least 11 digits. Make sure you include the country code'
    //     );
    //     formValid = false;
    //   } else {
    //     setPhoneNumberError('');
    //   }
    // } else {
    //   setPhoneNumberError('');
    // }

    // At least one workshop selected
    if (workshopsSelected.length === 0) {
      setWorkshopsError("Please select at least one workshop");
      formValid = false;
    } else {
      setWorkshopsError("");
    }

    AlreadyRegistered();
  };

  const AlreadyRegistered = async () => {
    const emailUsed = await axios.get(
      `${apiEndpoint}/registrants/${emailAddress}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (emailUsed.data.items === undefined) {
      setEmailError("");
      // Register the user
      console.log("OK to register!");
    } else {
      setEmailError(
        "This email address has already been used to register for the lottery"
      );
      formValid = false;
    }
    if (formValid) {
      onRegistrantCreate();
    } else {
      return;
    }
  };

  return (
    <div className="ui container">
      <Form onSubmit={ValidateForm}>
        <Form.Field>
          <label>First Name</label>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <div>
          <span>
            {firstNameError ? (
              <Label color="red">{firstNameError}</Label>
            ) : null}
          </span>
        </div>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <div>
          <span>
            {lastNameError ? <Label color="red">{lastNameError}</Label> : null}
          </span>
        </div>
        <Form.Field>
          <label>Email Address</label>
          <input
            placeholder="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </Form.Field>
        <div>
          <span>
            {emailError ? <Label color="red">{emailError}</Label> : null}
          </span>
        </div>
        <Form.Field>
          <label>Confirm Email Address</label>
          <input
            placeholder="Confirm Email Address"
            value={confirmEmailAddress}
            onChange={(e) => setConfirmEmailAddress(e.target.value)}
          />
        </Form.Field>
        <div>
          <span>
            {confirmEmailError ? (
              <Label color="red">{confirmEmailError}</Label>
            ) : null}
          </span>
        </div>
        {/* <Form.Field>
          <label>Phone Number (Optional)</label>
          <label>
            Please enter a phone number if you would like to receive text
            messages about your Fast Flash Workshops
          </label>
          <input
            placeholder='Phone Number - Country Code First (e.g. 1 for the US or Canada)'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Field> */}
        {/* <div>
          <span>
            {phoneNumberError ? (
              <Label color='red'>{phoneNumberError}</Label>
            ) : null}
          </span>
        </div> */}
        <p />
        <div>
          <Header as="h2" textAlign="center">
            Workshops
          </Header>
          <div>
            <Container text>
              <Header as="h3" textAlign="center">
                You may enroll in the lottery for as many workshops as you would
                like. If selected for a workshop your other lottery entries will
                be removed.
              </Header>
              <p />
            </Container>
            <p />
          </div>
        </div>
        <div>
          <div>
            <Grid>{displayWorkshops()}</Grid>
          </div>
        </div>
        <div>
          <span>
            {workshopsError ? (
              <Label color="red">{workshopsError}</Label>
            ) : null}
          </span>
        </div>
        <p />
        <Form.Button color="orange">Enroll</Form.Button>
        <p />
      </Form>
    </div>
  );
};
export default Registration;
