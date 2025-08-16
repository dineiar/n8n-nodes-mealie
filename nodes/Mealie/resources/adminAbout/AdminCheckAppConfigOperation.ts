import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class AdminCheckAppConfigOperation implements MealieN8nOperation {
  static readonly OperationId = 'checkAdminAppConfig';
  static readonly Operation: INodePropertyOptions = {
    name: 'Check App Config',
    value: AdminCheckAppConfigOperation.OperationId,
    action: 'Check app configuration',
    description: 'Check application configuration status',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/about/check',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
