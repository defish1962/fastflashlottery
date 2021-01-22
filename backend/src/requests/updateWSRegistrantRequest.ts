/**
 * Fields in a request to update a single Workshop Registrant.
 */
export interface UpdateWSRegistrantRequest {
  workshopId: string;
  emailAddress: string;
  paid: string;
  selected: string;
  waitlisted: string;
  declined: string;
  paymentId: string;
  payerId: string;
  eligible: string;
}
