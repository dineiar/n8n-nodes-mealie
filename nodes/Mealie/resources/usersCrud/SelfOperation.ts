import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class SelfOperation implements MealieN8nOperation {
  static readonly OperationId = 'getUserSelf';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Logged User Information',
    value: SelfOperation.OperationId,
    action: 'Get logged user information',
    description: 'Get logged user info',
    routing: {
      request: {
        method: 'GET',
        url: '/api/users/self',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}