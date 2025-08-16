import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class UpdateHouseholdOperation implements MealieN8nOperation {
  static readonly OperationId = 'updateHousehold';
  static readonly Operation: INodePropertyOptions = {
    name: 'Update Household',
    value: UpdateHouseholdOperation.OperationId,
    action: 'Update a household',
    description: 'Update an existing household by their ID',
    routing: {
      request: {
        method: 'PUT',
        url: '=/api/admin/households/{{$parameter.householdId}}',
        body: {
          groupId: '={{$parameter.groupId}}',
          name: '={{$parameter.name}}',
          id: '={{$parameter.householdId}}',
          preferences: '={{$parameter.preferences || undefined}}',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Household ID',
      name: 'householdId',
      type: 'string',
      required: true,
      default: '',
      description: 'The UUID of the household to update',
      displayOptions: {
        show: {
          operation: [UpdateHouseholdOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Group ID',
      name: 'groupId',
      type: 'string',
      required: true,
      default: '',
      description: 'The UUID of the group this household belongs to',
      displayOptions: {
        show: {
          operation: [UpdateHouseholdOperation.OperationId],
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
          operation: [UpdateHouseholdOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Preferences as JSON',
      name: 'preferences',
      type: 'json',
      default: '',
      description: 'Household preferences as JSON object',
      displayOptions: {
        show: {
          operation: [UpdateHouseholdOperation.OperationId],
        },
      },
    },
  ];
}
