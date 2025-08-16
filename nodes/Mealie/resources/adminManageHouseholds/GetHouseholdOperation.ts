import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetHouseholdOperation implements MealieN8nOperation {
  static readonly OperationId = 'adminGetHousehold';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Household',
    value: GetHouseholdOperation.OperationId,
    action: 'Get a household by ID',
    description: 'Get a single household by their ID',
    routing: {
      request: {
        method: 'GET',
        url: '=/api/admin/households/{{$parameter.householdId}}',
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
      description: 'The UUID of the household to retrieve',
      displayOptions: {
        show: {
          operation: [GetHouseholdOperation.OperationId],
        },
      },
    },
  ];
}
