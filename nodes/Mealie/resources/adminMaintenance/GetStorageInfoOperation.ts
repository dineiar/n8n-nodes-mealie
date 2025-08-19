import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetStorageInfoOperation implements MealieN8nOperation {
  static readonly OperationId = 'getStorageInfo';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Storage Info',
    value: GetStorageInfoOperation.OperationId,
    action: 'Get storage information',
    description: 'Get storage usage and information',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/maintenance/storage',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
