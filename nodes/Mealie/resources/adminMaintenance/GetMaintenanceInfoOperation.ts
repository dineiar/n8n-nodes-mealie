import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetMaintenanceInfoOperation implements MealieN8nOperation {
  static readonly OperationId = 'getMaintenanceInfo';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Maintenance Info',
    value: GetMaintenanceInfoOperation.OperationId,
    action: 'Get maintenance information',
    description: 'Get general maintenance information',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/maintenance',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
