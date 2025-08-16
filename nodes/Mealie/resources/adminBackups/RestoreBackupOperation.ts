import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class RestoreBackupOperation implements MealieN8nOperation {
  static readonly OperationId = 'restoreBackup';
  static readonly Operation: INodePropertyOptions = {
    name: 'Restore Backup',
    value: RestoreBackupOperation.OperationId,
    action: 'Restore backup',
    description: 'Restore from a backup file',
    routing: {
      request: {
        method: 'POST',
        url: '=/api/admin/backups/{{$parameter.fileName}}/restore',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'File Name',
      name: 'fileName',
      type: 'string',
      required: true,
      default: '',
      description: 'The name of the backup file to restore from',
      displayOptions: {
        show: {
          operation: [RestoreBackupOperation.OperationId],
        },
      },
    },
  ];
}
