import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { UpdateWSRegistrantRequest } from '../../requests/UpdateWSRegistrantRequest';
import { createLogger } from '../../utils/logger';
import { UpdateWSRegistrant } from '../../businessLogic/workshopRegister';

const logger = createLogger('updateWorkshopRegistrant');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const workshopId = event.pathParameters.workshopId;
  const emailAddress = event.pathParameters.emailAddress;
  const updateWSRegistrant: UpdateWSRegistrantRequest = JSON.parse(event.body);

  logger.info('update', updateWSRegistrant);

  const updateItem = await UpdateWSRegistrant(
    workshopId,
    emailAddress,
    updateWSRegistrant
  );

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      item: updateItem,
    }),
  };
};
