import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class UpdatePasswordOperation implements MealieN8nOperation {
  static readonly OperationId = 'updatePassword';
  static readonly Operation: INodePropertyOptions = {
    name: 'Update Password',
    value: UpdatePasswordOperation.OperationId,
    action: 'Update user password',
    description: 'Resets the User Password',
    routing: {
      request: {
        method: 'PUT',
        url: '/api/users/password',
        body: {
          currentPassword: '={{$parameter.currentPassword}}',
          newPassword: '={{$parameter.newPassword}}',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Current Password',
      name: 'currentPassword',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      description: 'The current password of the user',
      displayOptions: {
        show: {
          operation: [UpdatePasswordOperation.OperationId],
        },
      },
    },
    {
      displayName: 'New Password',
      name: 'newPassword',
      type: 'string',
      typeOptions: { password: true },
      required: true,
      default: '',
      description: 'The new password for the user (minimum 8 characters)',
      displayOptions: {
        show: {
          operation: [UpdatePasswordOperation.OperationId],
        },
      },
    },
  ];
}
