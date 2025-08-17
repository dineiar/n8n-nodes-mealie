import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class EmailInvitationOperation implements MealieN8nOperation {
  static readonly OperationId = 'emailInvitation';
  static readonly Operation: INodePropertyOptions = {
    name: 'Email Invitation',
    value: EmailInvitationOperation.OperationId,
    action: 'Send email invitation',
    description: 'Send an invitation via email',
    routing: {
      request: {
        method: 'POST',
        url: '/api/households/invitations/email',
        body: {
          email: '={{$parameter.email}}',
          token: '={{$parameter.token}}',
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
      description: 'The email address to send the invitation to',
      displayOptions: {
        show: {
          operation: [EmailInvitationOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Token',
      name: 'token',
      type: 'string',
      typeOptions: { password: true },
      required: true,
      default: '',
      description: 'The invitation token to include in the email',
      displayOptions: {
        show: {
          operation: [EmailInvitationOperation.OperationId],
        },
      },
    },
  ];
}
