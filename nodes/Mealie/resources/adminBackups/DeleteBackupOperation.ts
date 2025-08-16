import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class DeleteBackupOperation implements MealieN8nOperation {
  static readonly OperationId = 'deleteBackup';
  static readonly Operation: INodePropertyOptions = {
    name: 'Delete Backup',
    value: DeleteBackupOperation.OperationId,
    action: 'Delete backup',
    description: 'Delete a backup file',
    routing: {
      request: {
        method: 'DELETE',
        url: '=/api/admin/backups/{{$parameter.fileName}}',
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
      description: 'The name of the backup file to delete',
      displayOptions: {
        show: {
          operation: [DeleteBackupOperation.OperationId],
        },
      },
    },
  ];
}
