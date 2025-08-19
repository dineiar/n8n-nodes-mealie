import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CleanTempOperation implements MealieN8nOperation {
  static readonly OperationId = 'cleanTemp';
  static readonly Operation: INodePropertyOptions = {
    name: 'Clean Temp Files',
    value: CleanTempOperation.OperationId,
    action: 'Clean temporary files',
    description: 'Clean up temporary files from storage',
    routing: {
      request: {
        method: 'POST',
        url: '/api/admin/maintenance/clean/temp',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
