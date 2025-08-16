import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class AdminAppInfoOperation implements MealieN8nOperation {
  static readonly OperationId = 'getAdminAppInfo';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Admin App Info',
    value: AdminAppInfoOperation.OperationId,
    action: 'Get admin app information',
    description: 'Get general admin application information',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/about',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
