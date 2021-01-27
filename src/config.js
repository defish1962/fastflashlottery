const apiId = "yjer5tpylj";

export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`;

export const authConfig = {
  domain: "dev-5-kp86z1.auth0.com", // Auth0 domain
  clientId: "lqYN8XzNGXWOEug4PZ4qRayOr7SKzrUT", // Auth0 client id
  callbackUrl: "http://localhost:3000/callback",
};

export const emailConfig = {
  from: "donotreply@kathy-fish.com",
  subject: "Fast Flash Workshops Lottery Enrollment Confirmation",
  html:
    "The lottery will be held after 6 PM EST Tuesday January26 (11 PM GMT Tuesday January 26) and winners will be notified soon after. If you are not chosen you will automatically be placed in the waitlist lottery that will be held to fill any remaining spots once the registration window closes. <p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};

export const winnerEmailConfig = {
  from: "donotreply@kathy-fish.com",
  subject: "Fast Flash Workshops Lottery Selection Notification",
  htmlDeadline:
    "<p>You have until 6 PM EST on Thursday January 28 (11 PM GMT Thursday January 28) to confirm registration and submit payment for the course. Any unconfirmed/unpaid registrations at that time will be released and offered to participants on the waitlist through the lottery process<p />",
  html:
    "<p />You will receive more information as the starting date of your workshop draws nearer. <p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};

export const waitlistWinnerEmailConfig = {
  from: "donotreply@kathy-fish.com",
  subject: "Fast Flash Workshops Waitlist Lottery Selection Notification",
  htmlDeadline:
    "<p>You have until 6 PM EST on Saturday January 30 (11 PM GMT Saturday January 30) to confirm registration and submit payment for the course. Any unconfirmed/unpaid registrations at that time will be released and offered to participants on the waitlist through the lottery process<p />",
  html:
    "<p />You will receive more information as the starting date of your workshop draws nearer. <p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};

export const waitlistEmailConfig = {
  from: "donotreply@kathy-fish.com",
  subject: "Fast Flash Workshops Waitlist Notification",
  html: `<p>First of all, I want to thank you very much for your interest in my workshops! There was an unprecedented number of sign-ups for the Fast Flash lottery this go around and unfortunately, your name wasn't chosen. However, I always get a few cancellations and I will draw from the remaining list to fill those spots.<p>In the meantime, you may use <a href="https://www.skillshare.com/site/join?teacherRef=7568564&via=teacher-referral-channel&utm_campaign=teacher-referral-channel&utm_source=ShortUrl&utm_medium=teacher-referral-channel&name=Kathy-Fish&username=7568564">this link</a> to get two FREE months of premium membership with Skillshare.<p>I teach two very popular and highly rated video classes there: "Fast Flash Fiction: Writing Tiny, Beautiful Stories" and "Descriptive Writing: Crafting Vivid, Immersive Scenes." 
    <p>There are thousands of incredible classes and instructors at Skillshare! I have taken several classes myself. So I highly recommend this platform for learning online at your own pace.<p>I will be announcing a new round of classes in early summer!<p>Many thanks,<p>Kathy</font><p>Copyright © 2021 Fast Flash Workshops, All rights reserved.You are receiving this email because you opted in via our website.<p>Our mailing address is:<br>Fast Flash Workshops<br>239 Corby Pl<br>Castle Pines, CO 80108-8856<p><a href="https://kathy-fish.us17.list-manage.com/vcard?u=9d6fe239b27c9f5ee5296b680&id=1d339d435d" class="hcard-download">Add us to your address book</a><p><a href="https://kathy-fish.us17.list-manage.com/unsubscribe?u=9d6fe239b27c9f5ee5296b680&id=1d339d435d&e=[UNIQID]&c=40ec954adc" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-weight: normal;text-decoration: underline;">unsubscribe from this list</a>.<br></body></html>`,
  bcc: ["registration@kathy-fish.com"],
};

export const registrationCompleteEmailConfig = {
  from: "donotreply@kathy-fish.com",
  subject: "Fast Flash Workshop Registration Confirmation",
  html:
    "You will receive more information as the starting date of your workshop draws nearer. <p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};

export const dunningNoticeEmailConfig = {
  from: "donotreply@kathy-fish.com",
  subject: "Fast Flash Workshop Registration Reminder",
  html: "<p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};
