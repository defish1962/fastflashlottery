import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import EmailValidator from "email-validator";
import { apiEndpoint } from "../config";
import { Form, Input, Label } from "semantic-ui-react";
import { emailConfig } from "../config";
import { sendEmail } from "../api/email-api";
import { createRegistrant } from "../api/registrants-api";

const SeminarRegistration = () => {
  var [emailAddress, setEmailAddress] = useState("");
  var [confirmEmailAddress, setConfirmEmailAddress] = useState("");
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const history = useHistory();
  let formValid = true;

  const sendMail = async () => {
    let html = `Dear ${firstName}, this email confirms your registration in the Fast Flash Seminar Series.<p>`;
    html += emailConfig.html;
    await sendEmail({
      from: emailConfig.from,
      to: emailAddress,
      replyTo: emailConfig.replyTo,
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
        phoneNumber: phoneNumber,
      });

      //Send Confirmation email
      sendMail();

      history.push({
        pathname: "/RegistrationSuccess",
        state: {
          email: emailAddress,
        },
      });
    } catch {
      alert("Oh oh! Looks like something went wrong. Please try again");
    }
  };

  const ValidateForm = () => {
    formValid = true;

    //Trim any blank spaces off the email adress
    emailAddress = emailAddress.trim();
    confirmEmailAddress = confirmEmailAddress.trim();

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
    firstName = firstName.trim();
    if (firstName.length < 1) {
      setFirstNameError("Please provide a first name");
      formValid = false;
    } else {
      setFirstNameError("");
    }

    // Last Name Entered
    lastName = lastName.trim();
    if (lastName.length < 1) {
      setLastNameError("Please provide a last name");
      formValid = false;
    } else {
      setLastNameError("");
    }

    //Phone Number is long enough
    if (phoneNumber.length > 0) {
      if (phoneNumber.length < 11) {
        setPhoneNumberError(
          "Phone number must be at least 11 digits. Make sure you include the country code"
        );
        formValid = false;
      } else {
        setPhoneNumberError("");
      }
    } else {
      setPhoneNumberError("");
    }

    //Make sure they are not already registered with this email address
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
        "This email address has already been used to register for the seminar series"
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
        <Form.Field>
          <label>Phone Number (Optional)</label>
          <label>
            Please enter a phone number if you would like to receive text
            messages about the Fast Flash Seminar Series
          </label>
          <input
            placeholder="Phone Number - Country Code First (e.g. 1 for the US or Canada)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Field>
        <div>
          <span>
            {phoneNumberError ? (
              <Label color="red">{phoneNumberError}</Label>
            ) : null}
          </span>
        </div>
        <p />
        <Form.Button color="orange">Register</Form.Button>
        <p />
      </Form>
    </div>
  );
};
export default SeminarRegistration;
