import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class RefreshTokenOperation implements MealieN8nOperation {
  static readonly OperationId = 'refreshToken';
  static readonly Operation: INodePropertyOptions = {
    name: 'Refresh Token',
    value: RefreshTokenOperation.OperationId,
    action: 'Refresh authentication token',
    description: 'Use a valid token to get another token',
    routing: {
      request: {
        method: 'GET',
        url: '/api/auth/refresh',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
