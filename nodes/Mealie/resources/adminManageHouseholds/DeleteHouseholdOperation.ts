import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class DeleteHouseholdOperation implements MealieN8nOperation {
  static readonly OperationId = 'deleteHousehold';
  static readonly Operation: INodePropertyOptions = {
    name: 'Delete Household',
    value: DeleteHouseholdOperation.OperationId,
    action: 'Delete a household',
    description: 'Delete an existing household by their ID',
    routing: {
      request: {
        method: 'DELETE',
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
      description: 'The UUID of the household to delete',
      displayOptions: {
        show: {
          operation: [DeleteHouseholdOperation.OperationId],
        },
      },
    },
  ];
}
