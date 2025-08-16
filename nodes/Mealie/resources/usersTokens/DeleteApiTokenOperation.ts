import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class DeleteApiTokenOperation implements MealieN8nOperation {
	static readonly OperationId = 'deleteApiToken';
	static readonly Operation: INodePropertyOptions = {
		name: 'Delete API Token',
		value: DeleteApiTokenOperation.OperationId,
		action: 'Delete an API token',
		description: 'Delete an API token',
		routing: {
			request: {
				method: 'DELETE',
				url: '=/api/users/api-tokens/{{$parameter.tokenId}}',
			},
		},
	};

	static readonly Fields: INodeProperties[] = [
		{
			displayName: 'Token ID',
			name: 'tokenId',
			// eslint-disable-next-line n8n-nodes-base/node-param-type-options-password-missing
			type: 'string',
			required: true,
			default: '',
			description: 'The ID of the token to delete',
			displayOptions: {
				show: {
					operation: [DeleteApiTokenOperation.OperationId],
				},
			},
		},
	];
}
