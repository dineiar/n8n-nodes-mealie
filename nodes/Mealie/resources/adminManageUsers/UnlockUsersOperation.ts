import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class UnlockUsersOperation implements MealieN8nOperation {
	static readonly OperationId = 'unlockUsers';
	static readonly Operation: INodePropertyOptions = {
		name: 'Unlock Users',
		value: UnlockUsersOperation.OperationId,
		action: 'Unlock users',
		description: 'Unlock locked user accounts',
		routing: {
			request: {
				method: 'POST',
				url: '/api/admin/users/unlock',
				qs: {
					force: '={{$parameter.force}}',
				},
			},
		},
	};

	static readonly Fields: INodeProperties[] = [
		{
			displayName: 'Force',
			name: 'force',
			type: 'boolean',
			default: false,
			description: 'Whether to force unlock all users',
			displayOptions: {
				show: {
					operation: [UnlockUsersOperation.OperationId],
				},
			},
		},
	];
}
