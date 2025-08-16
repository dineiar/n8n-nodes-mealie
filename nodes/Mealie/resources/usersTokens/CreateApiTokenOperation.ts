import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CreateApiTokenOperation implements MealieN8nOperation {
	static readonly OperationId = 'createApiToken';
	static readonly Operation: INodePropertyOptions = {
		name: 'Create API Token',
		value: CreateApiTokenOperation.OperationId,
		action: 'Create an API token',
		description: 'Create a new API token for the current user',
		routing: {
			request: {
				method: 'POST',
				url: '/api/users/api-tokens',
				body: {
					name: '={{$parameter.name}}',
				},
			},
		},
	};

	static readonly Fields: INodeProperties[] = [
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			required: true,
			default: '',
			description: 'The name of the API token',
			displayOptions: {
				show: {
					operation: [CreateApiTokenOperation.OperationId],
				},
			},
		},
	];
}
