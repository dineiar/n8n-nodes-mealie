import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CleanRecipeFoldersOperation implements MealieN8nOperation {
  static readonly OperationId = 'cleanRecipeFolders';
  static readonly Operation: INodePropertyOptions = {
    name: 'Clean Recipe Folders',
    value: CleanRecipeFoldersOperation.OperationId,
    action: 'Clean recipe folders',
    description: 'Clean up unused recipe folders from storage',
    routing: {
      request: {
        method: 'POST',
        url: '/api/admin/maintenance/clean/recipe-folders',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
