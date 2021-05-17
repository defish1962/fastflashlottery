import { sendEmail } from "../api/email-api.js";
import { inviteEmailConfig } from "../config.js";

const sendInformationEmail = async (email, fname) => {
  let html = inviteEmailConfig.html;
  await sendEmail({
    from: inviteEmailConfig.from,
    replyTo: inviteEmailConfig.replyTo,
    to: inviteEmailConfig.email,
    subject: inviteEmailConfig.subject,
    html: html,
    bcc: inviteEmailConfig.bcc,
  });
};

sendInformationEmail();
