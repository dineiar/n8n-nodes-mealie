import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CreateBackupOperation implements MealieN8nOperation {
  static readonly OperationId = 'createBackup';
  static readonly Operation: INodePropertyOptions = {
    name: 'Create Backup',
    value: CreateBackupOperation.OperationId,
    action: 'Create a new backup',
    description: 'Create a new backup of the application',
    routing: {
      request: {
        method: 'POST',
        url: '/api/admin/backups',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
