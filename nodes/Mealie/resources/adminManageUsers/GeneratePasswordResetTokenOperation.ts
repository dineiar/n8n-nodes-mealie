import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GeneratePasswordResetTokenOperation implements MealieN8nOperation {
	static readonly OperationId = 'generatePasswordResetToken';
	static readonly Operation: INodePropertyOptions = {
		name: 'Generate Password Reset Token',
		value: GeneratePasswordResetTokenOperation.OperationId,
		action: 'Generate password reset token',
		description: 'Generate a password reset token for a user',
		routing: {
			request: {
				method: 'POST',
				url: '/api/admin/users/password-reset-token',
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
			description: 'The email address of the user to generate reset token for',
			displayOptions: {
				show: {
					operation: [GeneratePasswordResetTokenOperation.OperationId],
				},
			},
		},
	];
}
