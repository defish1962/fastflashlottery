const apiId = "yjer5tpylj";

export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`;

export const authConfig = {
  domain: "dev-5-kp86z1.auth0.com", // Auth0 domain
  clientId: "lqYN8XzNGXWOEug4PZ4qRayOr7SKzrUT", // Auth0 client id
  callbackUrl: "http://localhost:3000/callback",
};

export const emailConfig = {
  from: "donotreply@kathy-fish.com",
  replyTo: "fishfastflash@gmail.com",
  subject: "Fast Flash Workshops Lottery Enrollment Confirmation",
  html:
    "The lottery will be held after 6 PM EST Tuesday January26 (11 PM GMT Tuesday January 26) and winners will be notified soon after. If you are not chosen you will automatically be placed in the waitlist lottery that will be held to fill any remaining spots once the registration window closes. <p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};

export const winnerEmailConfig = {
  from: "donotreply@kathy-fish.com",
  replyTo: "fishfastflash@gmail.com",
  subject: "Fast Flash Workshops Lottery Selection Notification",
  htmlDeadline:
    "<p>You have until 6 PM EST on Wednesday February 3 (11 PM GMT Wednesday February 3) to confirm registration and submit payment for the course. Any unconfirmed/unpaid registrations at that time will be released and offered to participants on the waitlist through the lottery process<p />",
  html:
    "<p />You will receive more information as the starting date of your workshop draws nearer. <p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};

export const waitlistWinnerEmailConfig = {
  from: "donotreply@kathy-fish.com",
  replyTo: "fishfastflash@gmail.com",
  subject: "Fast Flash Workshops Waitlist Lottery Selection Notification",
  htmlDeadline:
    "<p>You have until 6 PM EST on Saturday January 30 (11 PM GMT Saturday January 30) to confirm registration and submit payment for the course. Any unconfirmed/unpaid registrations at that time will be released and offered to participants on the waitlist through the lottery process<p />",
  html:
    "<p />You will receive more information as the starting date of your workshop draws nearer. <p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};

export const waitlistEmailConfig = {
  from: "donotreply@kathy-fish.com",
  replyTo: "fishfastflash@gmail.com",
  subject: "Fast Flash Workshops Waitlist Notification",
  html: `<p>First of all, I want to thank you very much for your interest in my workshops! There was an unprecedented number of sign-ups for the Fast Flash lottery this go around and unfortunately, your name wasn't chosen. However, I always get a few cancellations and I will draw from the remaining list to fill those spots.<p>In the meantime, you may use <a href="https://www.skillshare.com/site/join?teacherRef=7568564&via=teacher-referral-channel&utm_campaign=teacher-referral-channel&utm_source=ShortUrl&utm_medium=teacher-referral-channel&name=Kathy-Fish&username=7568564">this link</a> to get 14 days of premium membership with Skillshare.<p>I teach two very popular and highly rated video classes there: "Fast Flash Fiction: Writing Tiny, Beautiful Stories" and "Descriptive Writing: Crafting Vivid, Immersive Scenes." 
    <p>There are thousands of incredible classes and instructors at Skillshare! I have taken several classes myself. So I highly recommend this platform for learning online at your own pace.<p>I will be announcing a new round of classes in early summer!<p>Many thanks,<p>Kathy</font><p>Copyright © 2021 Fast Flash Workshops, All rights reserved.You are receiving this email because you opted in via our website.<p>Our mailing address is:<br>Fast Flash Workshops<br>239 Corby Pl<br>Castle Pines, CO 80108-8856<p><a href="https://kathy-fish.us17.list-manage.com/vcard?u=9d6fe239b27c9f5ee5296b680&id=1d339d435d" class="hcard-download">Add us to your address book</a><p><a href="https://kathy-fish.us17.list-manage.com/unsubscribe?u=9d6fe239b27c9f5ee5296b680&id=1d339d435d&e=[UNIQID]&c=40ec954adc" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-weight: normal;text-decoration: underline;">unsubscribe from this list</a>.<br></body></html>`,
  bcc: ["registration@kathy-fish.com"],
};

export const registrationCompleteEmailConfig = {
  from: "donotreply@kathy-fish.com",
  replyTo: "fishfastflash@gmail.com",
  subject: "Fast Flash Workshop Registration Confirmation",
  html:
    "You will receive more information as the starting date of your workshop draws nearer. <p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};

export const dunningNoticeEmailConfig = {
  from: "donotreply@kathy-fish.com",
  replyTo: "fishfastflash@gmail.com",
  subject: "Fast Flash Workshop Registration Reminder",
  html: "<p> Thanks so much!<br>Kathy",
  bcc: ["registration@kathy-fish.com"],
};
export const inviteEmailConfig = {
  from: "workshops@kathy-fish.com",
  replyTo: "fishfastflash@gmail.com",
  subject: "New Fast Flash Begins Monday, May 3rd - Important Info",
  email: "registration@kathy-fish.com",
  html:
    "Hi everyone!<p>Lots of info here, so read to the end and please save this email:<p>This Saturday, May 1st, you will all receive an invitation to the private Wordpress site I use for the Fast Flash Workshop. Please accept the invite and go have a look around! There will be a place for you to introduce yourselves to the other workshop participants (reply to my <b>Welcome, Introduce Yourselves</b> on the Post Your Work & Give Feedback page). Take note of the menu items at the top of the page: About, Daily Craft Articles, Exercises and Prompts, Inspirations/Reading, Post Your Work and Give Feedback.<p>We begin <b>MONDAY, MAY 3rd</b>. The class will run over the course of ten days (with the two weekend days <b>off</b>) and will conclude on <b>FRIDAY, MAY 14</b>.<p>This is a fast paced and generative workshop. You will write lots!<p><b>**Note: Amazing flash writer, teacher, and editor, K.B. Carle, will teach the lesson Friday, May 7th**</b><p>I will be posting each day’s materials the evening before in the U.S. (this accommodates early morning writers and writers from overseas). I will email you to let you know that the craft article, exercise, and inspiration/reading have been posted.<p>My preference is that you not fuss too much over the exercises and aim to write and post yours within 24 hrs. of receiving the prompt. This will be different for everyone as we are on different time zones and different life schedules. No set deadline, just post your work when you can and (hopefully, if you have time) read and comment on the other posted stories.<p>One key aspect of my workshop is that all feedback is POSITIVE in nature. We are not here to critique, rather to encourage and cheer each other on. I feel very strongly this is the best way to stay <b><i>in the zone</i></b> and keep churning out fresh drafts. This will be new to some of you, but you are going to have to trust me on this. 🙂<p>You will all be invited to the site as <b><i>authors</i></b> meaning you can post and edit your own stories. We will be using Post Your Work & Give Feedback for the working part of the course. To post your story, go up to the drop down menu on the upper left of the page and go to <b>Blog Posts</b> and click on <b>Add.</b> I will ask you to always put your name in the title section of your post.<p> I'm excited to get started! Please let me know if you have any questions/concerns/glitches so we can address them before workshop begins.<p><p>Cheers,<br>Kathy<p><p>Art of Flash Fiction: https://artofflashfiction.substack.com/<p>Website: kathy-fish.com<p>Twitter: @kathyfish",
  bcc: [],
};

export const materialsPostedConfig = {
  from: "workshops@kathy-fish.com",
  replyTo: "fishfastflash@gmail.com",
  email: "registration@kathy-fish.com",
  subject: "Materials Posted",
  html: "Message goes here",
  bcc: [],
};
