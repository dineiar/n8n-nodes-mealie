import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetRatingsOperation implements MealieN8nOperation {
  static readonly OperationId = 'getUserRatings';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Ratings From User',
    value: GetRatingsOperation.OperationId,
    action: 'Get ratings from user',
    description: 'Get user ratings',
    routing: {
      request: {
        method: 'GET',
        url: '=/api/users/{{$parameter.userId}}/ratings',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'User ID',
      displayOptions: {
        show: {
          operation: [GetRatingsOperation.OperationId],
        },
      },
      name: 'userId',
      type: 'string',
      default: '',
      required: true,
      placeholder: 'ID of the user to get ratings from',
    }
  ];
}