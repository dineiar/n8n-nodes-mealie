import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetBackupOperation implements MealieN8nOperation {
  static readonly OperationId = 'getBackup';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Backup Download Token',
    value: GetBackupOperation.OperationId,
    action: 'Get backup download token',
    description: 'Returns a token to download a backup file',
    routing: {
      request: {
        method: 'GET',
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
      description: 'The name of the backup file',
      displayOptions: {
        show: {
          operation: [GetBackupOperation.OperationId],
        },
      },
    },
  ];
}
