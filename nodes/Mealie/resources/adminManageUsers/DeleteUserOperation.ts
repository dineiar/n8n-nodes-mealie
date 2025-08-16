import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class DeleteUserOperation implements MealieN8nOperation {
	static readonly OperationId = 'deleteUser';
	static readonly Operation: INodePropertyOptions = {
		name: 'Delete User',
		value: DeleteUserOperation.OperationId,
		action: 'Delete a user',
		description: 'Delete an existing user by their ID',
		routing: {
			request: {
				method: 'DELETE',
				url: '=/api/admin/users/{{$parameter.userId}}',
			},
		},
	};

	static readonly Fields: INodeProperties[] = [
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			required: true,
			default: '',
			description: 'The UUID of the user to delete',
			displayOptions: {
				show: {
					operation: [DeleteUserOperation.OperationId],
				},
			},
		},
	];
}
