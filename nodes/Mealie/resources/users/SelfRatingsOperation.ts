import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export class SelfRatingsOperation {
  static readonly OperationId = 'getUserSelfRatings';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Ratings From Logged User',
    value: SelfRatingsOperation.OperationId,
    action: 'Get ratings from logged user',
    description: 'Get logged user ratings',
    routing: {
      request: {
        method: 'GET',
        url: '/api/users/self/ratings',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Recipe ID',
      displayOptions: {
        show: {
          operation: [SelfRatingsOperation.OperationId],
        },
      },
      name: 'recipeId',
      type: 'string',
      default: '',
      placeholder: 'ID of the recipe to get ratings for',
      hint: 'Optional. If not provided, ratings for all recipes will be returned.',
      routing: {
        request: {
          url: '=/api/users/self/ratings{{$value ? "/"+$value : ""}}',
        },
      },
    }
  ];
}