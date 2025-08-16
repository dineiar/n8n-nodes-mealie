import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetUserOperation implements MealieN8nOperation {
  static readonly OperationId = 'getUser';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get User',
    value: GetUserOperation.OperationId,
    action: 'Get a user by ID',
    description: 'Get a single user by their ID',
    routing: {
      request: {
        method: 'GET',
        url: '=/api/admin/users/{{$parameter.userId}}',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'User ID',
      name: 'userId',
      type: 'string',
      required: true,
      default: '',
      description: 'The UUID of the user to retrieve',
      displayOptions: {
        show: {
          operation: [GetUserOperation.OperationId],
        },
      },
    },
  ];
}
