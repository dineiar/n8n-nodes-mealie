import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CleanImagesOperation implements MealieN8nOperation {
  static readonly OperationId = 'cleanImages';
  static readonly Operation: INodePropertyOptions = {
    name: 'Clean Images',
    value: CleanImagesOperation.OperationId,
    action: 'Clean unused images',
    description: 'Clean up unused images from storage',
    routing: {
      request: {
        method: 'POST',
        url: '/api/admin/maintenance/clean/images',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
