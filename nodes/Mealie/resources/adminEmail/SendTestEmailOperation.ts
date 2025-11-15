import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class SendTestEmailOperation implements MealieN8nOperation {
  static readonly OperationId = 'sendTestEmail';
  static readonly Operation: INodePropertyOptions = {
    name: 'Send Test Email',
    value: SendTestEmailOperation.OperationId,
    action: 'Send test email',
    description: 'Send a test email to verify email configuration',
    routing: {
      request: {
        method: 'POST',
        url: '/api/admin/email',
        body: {
          email: '={{$parameter.email}}',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Email',
      name: 'email',
      type: 'string',
      placeholder: 'name@email.com',
      required: true,
      default: '',
      description: 'The email address to send the test email to',
      displayOptions: {
        show: {
          operation: [SendTestEmailOperation.OperationId],
        },
      },
    },
  ];
}
