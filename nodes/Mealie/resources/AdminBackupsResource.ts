import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nResource } from '../generic/MealieN8nResource';
import {
  CreateBackupOperation,
  DeleteBackupOperation,
  GetAllBackupsOperation,
  GetBackupOperation,
  RestoreBackupOperation,
  UploadBackupOperation,
} from './adminBackups';

export class AdminBackupsResource implements MealieN8nResource {
  static readonly ResourceId = 'adminBackups';
  static readonly Resource: INodePropertyOptions = {
    name: 'Admin: Backups',
    value: AdminBackupsResource.ResourceId,
  };

  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [AdminBackupsResource.ResourceId],
        },
      },
      options: [
        GetAllBackupsOperation.Operation,
        CreateBackupOperation.Operation,
        GetBackupOperation.Operation,
        DeleteBackupOperation.Operation,
        UploadBackupOperation.Operation,
        RestoreBackupOperation.Operation,
      ],
      default: '',
    },
    ...GetAllBackupsOperation.Fields,
    ...CreateBackupOperation.Fields,
    ...GetBackupOperation.Fields,
    ...DeleteBackupOperation.Fields,
    ...UploadBackupOperation.Fields,
    ...RestoreBackupOperation.Fields,
  ];
}
