import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CheckEmailConfigOperation implements MealieN8nOperation {
  static readonly OperationId = 'checkEmailConfig';
  static readonly Operation: INodePropertyOptions = {
    name: 'Check Email Config',
    value: CheckEmailConfigOperation.OperationId,
    action: 'Check email configuration',
    description: 'Get general email configuration information',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/email',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
