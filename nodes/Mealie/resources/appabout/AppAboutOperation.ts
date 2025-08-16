import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class AppAboutOperation implements MealieN8nOperation {
  static readonly OperationId = 'getAppAbout';
  static readonly Operation: INodePropertyOptions = {
      name: 'Get Instance Information',
      value: AppAboutOperation.OperationId,
      action: 'Get instance information',
      description: 'Get app about',
      routing: {
          request: {
              method: 'GET',
              url: '/api/app/about',
          },
      },
  };

  static readonly Fields: INodeProperties[] = [];
}