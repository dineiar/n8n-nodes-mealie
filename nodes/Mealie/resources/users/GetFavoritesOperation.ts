import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export class GetFavoritesOperation {
  static readonly OperationId = 'getUserFavorites';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Favorites From User',
    value: GetFavoritesOperation.OperationId,
    action: 'Get favorites from user',
    description: 'Get user favorites',
    routing: {
      request: {
        method: 'GET',
        url: '=/api/users/{{$parameter.userId}}/favorites',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'User ID',
      displayOptions: {
        show: {
          operation: [GetFavoritesOperation.OperationId],
        },
      },
      name: 'userId',
      type: 'string',
      default: '',
      required: true,
      placeholder: 'ID of the user to get favorites from',
    }
  ];
}