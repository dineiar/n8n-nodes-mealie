import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class AdminAppStatisticsOperation implements MealieN8nOperation {
  static readonly OperationId = 'getAdminAppStatistics';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get App Statistics',
    value: AdminAppStatisticsOperation.OperationId,
    action: 'Get app statistics',
    description: 'Get application statistics',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/about/statistics',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
