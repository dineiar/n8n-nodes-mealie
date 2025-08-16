import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class AppThemeOperation implements MealieN8nOperation {
  static readonly OperationId = 'getAppTheme';
  static readonly Operation: INodePropertyOptions = {
      name: 'Get Instance Theme Information',
      value: AppThemeOperation.OperationId,
      action: 'Get instance theme information',
      description: 'Get app theme info',
      routing: {
          request: {
              method: 'GET',
              url: '/api/app/about/theme',
          },
      },
  };

  static readonly Fields: INodeProperties[] = [];
}