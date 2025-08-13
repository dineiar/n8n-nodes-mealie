import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export class SelfFavoritesOperation {
  static readonly OperationId = 'getUserSelfFavorites';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Favorites From Logged User',
    value: SelfFavoritesOperation.OperationId,
    action: 'Get favorites from logged user',
    description: 'Get logged user favorites',
    routing: {
      request: {
        method: 'GET',
        url: '/api/users/self/favorites',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}