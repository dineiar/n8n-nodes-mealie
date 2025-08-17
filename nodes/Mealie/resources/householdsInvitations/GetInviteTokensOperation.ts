import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetInviteTokensOperation implements MealieN8nOperation {
  static readonly OperationId = 'getInviteTokens';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Invite Tokens',
    value: GetInviteTokensOperation.OperationId,
    action: 'Get invite tokens',
    description: 'Get all invite tokens for the household',
    routing: {
      request: {
        method: 'GET',
        url: '/api/households/invitations',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
