import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiEndpoint, materialsPostedConfig } from "../config";
import { Form, Input, Label } from "semantic-ui-react";
import { sendEmail } from "../api/email-api";
import { formatDate } from "../helper";
import WorkshopParticipants from "./WorkshopParticipants";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const EmailGroup = () => {
  const [workshops, setWorkshops] = useState([{}]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailSubjectError, setEmailSubjectError] = useState("");
  const [emailMessageError, setEmailMessageError] = useState("");
  const [workshopError, setWorkshopError] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const history = useHistory();
  let formValid = true;
  var ccEmail = [];

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

  const sendMail = async () => {
    let wsParticipants = await WorkshopParticipants(selectedWorkshop);

    for (let i = 0; i < wsParticipants.length; i++) {
      ccEmail.push(wsParticipants[i].emailAddress);
    }
    ccEmail.push("dave@davidefish.com");

    await sendEmail({
      from: materialsPostedConfig.from,
      to: materialsPostedConfig.email,
      subject: emailSubject,
      html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      bcc: ccEmail,
    });
  };

  const sendEmailMessage = async () => {
    try {
      //Send Confirmation email
      await sendMail();

      history.push({
        pathname: "/EmailSuccess",
        state: {
          emails: ccEmail,
        },
      });
    } catch {
      alert("Oh oh! Looks like something went wrong. Please try again");
    }
  };

  const displayWorkshops = () => {
    return workshops.map((workshop, index) => {
      return (
        <option key={index} value={workshop.workshopId}>
          {formatDate(workshop.workshopStart)} -{" "}
          {formatDate(workshop.workshopEnd)}
        </option>
      );
    });
  };

  const ValidateForm = () => {
    formValid = true;

    // Email Subject Entered
    if (emailSubject.length < 1) {
      setEmailSubjectError("Please provide an email subject");
      formValid = false;
    } else {
      setEmailSubjectError("");
    }

    // Email Message Entered
    if (editorState.length < 1) {
      setEmailMessageError("Please provide a message");
      formValid = false;
    } else {
      setEmailMessageError("");
    }
    if (selectedWorkshop < 1) {
      setWorkshopError("Please select a workshop to email");
      formValid = false;
    } else {
      setWorkshopError("");
    }

    if (formValid) {
      sendEmailMessage();
    }
  };

  return (
    <div className="ui container">
      <Form onSubmit={ValidateForm}>
        <div>
          <Form.Field>
            <label>Select Workshop to Email</label>
            <select onChange={(e) => setSelectedWorkshop(e.target.value)}>
              <option value="">Workshop</option>
              {displayWorkshops()}
            </select>
          </Form.Field>
        </div>
        <div>
          <span>
            {workshopError ? <Label color="red">{workshopError}</Label> : null}
          </span>
        </div>

        <p />
        <Form.Field>
          <label>Email Subject</label>
          <Input
            placeholder="Email Subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
          />
        </Form.Field>
        <div>
          <span>
            {emailSubjectError ? (
              <Label color="red">{emailSubjectError}</Label>
            ) : null}
          </span>
        </div>
        <Form.Field>
          <label>Email Message</label>
          <Editor
            editorStyle={{ border: "1px solid #C0C0C0" }}
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </Form.Field>
        <div>
          <span>
            {emailMessageError ? (
              <Label color="red">{emailMessageError}</Label>
            ) : null}
          </span>
        </div>
        <p />
        <Form.Button color="orange">Send Email</Form.Button>
        <p />
      </Form>
    </div>
  );
};
export default EmailGroup;
