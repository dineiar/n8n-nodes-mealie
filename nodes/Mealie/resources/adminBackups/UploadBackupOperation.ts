import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class UploadBackupOperation implements MealieN8nOperation {
  static readonly OperationId = 'uploadBackup';
  static readonly Operation: INodePropertyOptions = {
    name: 'Upload Backup',
    value: UploadBackupOperation.OperationId,
    action: 'Upload backup',
    description: 'Upload a backup file',
    routing: {
      request: {
        method: 'POST',
        url: '/api/admin/backups/upload',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Backup File',
      name: 'backupFile',
      type: 'string',
      typeOptions: {
        rows: 1,
      },
      required: true,
      default: '',
      description: 'The backup file to upload (binary data property name or base64 string)',
      displayOptions: {
        show: {
          operation: [UploadBackupOperation.OperationId],
        },
      },
    },
  ];
}
