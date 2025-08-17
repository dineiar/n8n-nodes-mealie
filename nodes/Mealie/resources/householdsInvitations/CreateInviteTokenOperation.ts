import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CreateInviteTokenOperation implements MealieN8nOperation {
  static readonly OperationId = 'createInviteToken';
  static readonly Operation: INodePropertyOptions = {
    name: 'Create Invite Token',
    value: CreateInviteTokenOperation.OperationId,
    action: 'Create invite token',
    description: 'Create a new invite token',
    routing: {
      request: {
        method: 'POST',
        url: '/api/households/invitations',
        body: {
          uses: '={{$parameter.uses}}',
          groupId: '={{$parameter.groupId}}',
          householdId: '={{$parameter.householdId}}',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Uses',
      name: 'uses',
      type: 'number',
      required: true,
      default: 1,
      description: 'Number of times the invite token can be used',
      displayOptions: {
        show: {
          operation: [CreateInviteTokenOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Group ID',
      name: 'groupId',
      type: 'string',
      default: '',
      description: 'The ID of the group to invite to (optional)',
      displayOptions: {
        show: {
          operation: [CreateInviteTokenOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Household ID',
      name: 'householdId',
      type: 'string',
      default: '',
      description: 'The ID of the household to invite to (optional)',
      displayOptions: {
        show: {
          operation: [CreateInviteTokenOperation.OperationId],
        },
      },
    },
  ];
}
