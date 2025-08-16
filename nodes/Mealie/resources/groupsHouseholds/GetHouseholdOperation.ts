import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetHouseholdOperation implements MealieN8nOperation {
  static readonly OperationId = 'getGroupHousehold';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Household',
    value: GetHouseholdOperation.OperationId,
    action: 'Get a household',
    routing: {
      request: {
        method: 'GET',
        url: '=/api/groups/households/{{$parameter.householdSlug}}',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Household Slug',
      name: 'householdSlug',
      type: 'string',
      required: true,
      default: '',
      description: 'The slug of the household to get',
      displayOptions: {
        show: {
          operation: [GetHouseholdOperation.OperationId],
        },
      },
    },
  ];
}
