import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class LogoutOperation implements MealieN8nOperation {
  static readonly OperationId = 'logout';
  static readonly Operation: INodePropertyOptions = {
    name: 'Logout',
    value: LogoutOperation.OperationId,
    action: 'Logout user',
    description: 'Logout the current user',
    routing: {
      request: {
        method: 'POST',
        url: '/api/auth/logout',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
