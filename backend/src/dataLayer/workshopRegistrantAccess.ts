import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { WorkshopRegistrants } from '../models/WorkshopRegistrants';
import { WorkshopRegistrantsUpdate } from '../models/WorkshopRegistrantsUpdate';
import { createLogger } from '../utils/logger';

const logger = createLogger('RegistrantAccess');

export class WorkshopRegistrantAccess {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly workshopsRegistrantTable = process.env.WS_REG_TEST_TABLE
  ) {}

  //Create WorkshopRegistrant function
  async createWSRegistrant(
    WorkshopRegistrants: WorkshopRegistrants
  ): Promise<WorkshopRegistrants> {
    await this.docClient
      .put({
        TableName: this.workshopsRegistrantTable,
        Item: WorkshopRegistrants,
      })
      .promise();

    return WorkshopRegistrants;
  }

  //Get WorkshopRegistrants
  async getWSRegistrants(workshopId: string): Promise<WorkshopRegistrants[]> {
    const result = await this.docClient
      .scan({
        TableName: this.workshopsRegistrantTable,
        FilterExpression: '#wsId = :workshopId',
        ExpressionAttributeNames: {
          '#wsId': 'workshopId',
        },
        ExpressionAttributeValues: {
          ':workshopId': workshopId,
        },
      })
      .promise();

    return result.Items as WorkshopRegistrants[];
  }

  //Get a Workshop Registrant
  async getWSRegistrant(emailAddress: string): Promise<WorkshopRegistrants> {
    const result = await this.docClient
      .get({
        TableName: this.workshopsRegistrantTable,
        Key: {
          emailAddress: emailAddress,
        },
      })
      .promise();

    return result.Item as WorkshopRegistrants;
  }

  //Delete a Workshop Registrant function
  async deleteWSRegistrant(
    workshopId: string,
    emailAddress: string
  ): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.workshopsRegistrantTable,
        Key: {
          workshopId: workshopId,
          emailAddress: emailAddress,
        },
      })
      .promise();
  }

  //Edit a Workshop Registrant function
  async editWSRegistrant(
    workshopId: string,
    emailAddress: string,
    workshopRegistrantUpdate: WorkshopRegistrantsUpdate
  ): Promise<void> {
    logger.info('What Access TableName', process.env.WS_REG_TEST_TABLE);

    await this.docClient
      .update({
        TableName: this.workshopsRegistrantTable,
        Key: {
          workshopId: workshopId,
          emailAddress: emailAddress,
        },
        UpdateExpression:
          'set #selected= :selected, waitlisted= :waitlisted, declined= :declined, paid= :paid, paymentId= :paymentId, payerId= :payerId, eligible= :eligible',
        ExpressionAttributeValues: {
          ':selected': workshopRegistrantUpdate.selected,
          ':waitlisted': workshopRegistrantUpdate.waitlisted,
          ':declined': workshopRegistrantUpdate.declined,
          ':paid': workshopRegistrantUpdate.paid,
          ':paymentId': workshopRegistrantUpdate.paymentId,
          ':payerId': workshopRegistrantUpdate.payerId,
          ':eligible': workshopRegistrantUpdate.eligible,
        },
        ExpressionAttributeNames: {
          '#selected': 'selected',
        },
      })
      .promise();
  }
}
