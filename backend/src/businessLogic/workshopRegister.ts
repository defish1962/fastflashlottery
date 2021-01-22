import { CreateWSRegistrantRequest } from '../requests/CreateWSRegistrantRequest';
import { UpdateWSRegistrantRequest } from '../requests/updateWSRegistrantRequest';
import { WorkshopRegistrants } from '../models/WorkshopRegistrants';
import { WorkshopRegistrantAccess } from '../dataLayer/workshopRegistrantAccess';
import { createLogger } from '../utils/logger';

const workshopRegistrantAccess = new WorkshopRegistrantAccess();
const logger = createLogger('RegistrantAccess');

export async function CreateWSRegistrant(
  createWorkshopRegistrantRequest: CreateWSRegistrantRequest
): Promise<WorkshopRegistrants> {
  logger.info('Creating the workshop registrant');

  return await workshopRegistrantAccess.createWSRegistrant({
    workshopId: createWorkshopRegistrantRequest.workshopId,
    emailAddress: createWorkshopRegistrantRequest.emailAddress,
    paid: createWorkshopRegistrantRequest.paid,
    selected: createWorkshopRegistrantRequest.selected,
    waitlisted: createWorkshopRegistrantRequest.waitlisted,
    declined: createWorkshopRegistrantRequest.declined,
    createdAt: new Date().toISOString(),
  });
}

export async function getWSRegistrants(
  wsId: string
): Promise<WorkshopRegistrants[]> {
  logger.info('Getting Workshop Registrants');

  return await workshopRegistrantAccess.getWSRegistrants(wsId);
}

export async function getWSRegistrant(
  emailAddress: string
): Promise<WorkshopRegistrants> {
  logger.info('Getting the Workshop Registrant', {
    emailAddress: emailAddress,
  });

  return await workshopRegistrantAccess.getWSRegistrant(emailAddress);
}

export async function UpdateWSRegistrant(
  workshopId: string,
  emailAddress: string,
  updatedWSRegistrant: UpdateWSRegistrantRequest
): Promise<void> {
  logger.info('Updating the Workshop Registrant data', {
    workshopId: workshopId,
    emailAddress: emailAddress,
    updatedWSRegistrant,
  });

  await workshopRegistrantAccess.editWSRegistrant(workshopId, emailAddress, {
    declined: updatedWSRegistrant.declined,
    selected: updatedWSRegistrant.selected,
    waitlisted: updatedWSRegistrant.waitlisted,
    paid: updatedWSRegistrant.paid,
    paymentId: updatedWSRegistrant.paymentId,
    payerId: updatedWSRegistrant.payerId,
    eligible: updatedWSRegistrant.eligible,
  });
}
