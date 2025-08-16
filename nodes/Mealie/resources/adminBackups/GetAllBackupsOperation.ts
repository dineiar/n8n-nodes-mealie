import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetAllBackupsOperation implements MealieN8nOperation {
  static readonly OperationId = 'getAllBackups';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get All Backups',
    value: GetAllBackupsOperation.OperationId,
    action: 'Get all backups',
    description: 'Get all available backups',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/backups',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
