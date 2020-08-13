const apiId = 'yjer5tpylj';

export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`;

export const authConfig = {
  domain: 'dev-5-kp86z1.auth0.com', // Auth0 domain
  clientId: 'lqYN8XzNGXWOEug4PZ4qRayOr7SKzrUT', // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback',
};

export const emailConfig = {
  from: 'workshops@kathy-fish.com',
  subject: 'Fast Flash Workshops Lottery Enrollment Confirmation',
  html:
    'The lottery will be held after 5 PM MDT Wednesday August 12th (Midnight GMT Thursday August 13th) and winners will be notified soon after. If you are not chosen you will automatically be placed in the waitlist lottery that will be held to fill any remaining spots once the registration window closes. <p> Thanks so much!<br>Kathy',
  bcc: ['registration@kathy-fish.com'],
};

export const winnerEmailConfig = {
  from: 'workshops@kathy-fish.com',
  subject: 'Fast Flash Workshops Lottery Selection Notification',
  html:
    'You will receive more information as the starting date of your workshop draws nearer. <p> Thanks so much!<br>Kathy',
  bcc: ['registration@kathy-fish.com'],
};

export const waitlistEmailConfig = {
  from: 'workshops@kathy-fish.com',
  subject: 'Fast Flash Workshops Waitlist Notification',
  html:
    'In the meantime please consider taking my Skillshare courses. <p> Thanks so much!<br>Kathy',
  bcc: ['registration@kathy-fish.com'],
};

export const registrationCompleteEmailConfig = {
  from: 'workshops@kathy-fish.com',
  subject: 'Fast Flash Workshop Registration Confirmation',
  html:
    'You will receive more information as the starting date of your workshop draws nearer. <p> Thanks so much!<br>Kathy',
  bcc: ['registration@kathy-fish.com'],
};
