import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CreateHouseholdOperation implements MealieN8nOperation {
  static readonly OperationId = 'createHousehold';
  static readonly Operation: INodePropertyOptions = {
    name: 'Create Household',
    value: CreateHouseholdOperation.OperationId,
    action: 'Create a new household',
    description: 'Create a new household as admin',
    routing: {
      request: {
        method: 'POST',
        url: '/api/admin/households',
        body: {
          groupId: '={{$parameter.groupId}}',
          name: '={{$parameter.name}}',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Group ID',
      name: 'groupId',
      type: 'string',
      default: '',
      description: 'The UUID of the group this household belongs to',
      displayOptions: {
        show: {
          operation: [CreateHouseholdOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Name',
      name: 'name',
      type: 'string',
      required: true,
      default: '',
      description: 'The name of the household',
      displayOptions: {
        show: {
          operation: [CreateHouseholdOperation.OperationId],
        },
      },
    },
  ];
}
