import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CreateUserOperation implements MealieN8nOperation {
	static readonly OperationId = 'createUser';
	static readonly Operation: INodePropertyOptions = {
		name: 'Create User',
		value: CreateUserOperation.OperationId,
		action: 'Create a new user',
		description: 'Create a new user',
		routing: {
			request: {
				method: 'POST',
				url: '/api/admin/users',
				body: {
					email: '={{$parameter.email}}',
					username: '={{$parameter.username}}',
					fullName: '={{$parameter.fullName}}',
					authMethod: '={{$parameter.authMethod}}',
					admin: '={{$parameter.admin}}',
					group: '={{$parameter.group}}',
					household: '={{$parameter.household}}',
					advanced: '={{$parameter.advanced}}',
					canInvite: '={{$parameter.canInvite}}',
					canManage: '={{$parameter.canManage}}',
					canManageHousehold: '={{$parameter.canManageHousehold}}',
					canOrganize: '={{$parameter.canOrganize}}',
					password: '={{$parameter.password}}',
				},
			},
		},
	};

	static readonly Fields: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			required: true,
			default: '',
			description: 'The username of the user',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Full Name',
			name: 'fullName',
			type: 'string',
			required: true,
			default: '',
			description: 'The full name of the user',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			placeholder: 'name@email.com',
			required: true,
			default: '',
			description: 'The email address of the user',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'The password of the user',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Authentication Method',
			name: 'authMethod',
			type: 'options',
			options: [
				{ name: 'Mealie', value: 'Mealie' },
				{ name: 'LDAP', value: 'LDAP' },
				{ name: 'OIDC', value: 'OIDC' },
			],
			default: 'Mealie',
			description: 'Authentication method for the user',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Admin',
			name: 'admin',
			type: 'boolean',
			default: false,
			description: 'Whether the user is an admin',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Group Name',
			name: 'group',
			type: 'string',
			default: '',
			description: 'Group name for the user',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Household Name',
			name: 'household',
			type: 'string',
			default: '',
			description: 'Household name for the user',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Advanced',
			name: 'advanced',
			type: 'boolean',
			default: false,
			description: 'Whether the user is an advanced user',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Can Invite',
			name: 'canInvite',
			type: 'boolean',
			default: false,
			description: 'Whether the user can invite others',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Can Manage',
			name: 'canManage',
			type: 'boolean',
			default: false,
			description: 'Whether the user can manage the group',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Can Manage Household',
			name: 'canManageHousehold',
			type: 'boolean',
			default: false,
			description: 'Whether the user can manage their household',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Can Organize',
			name: 'canOrganize',
			type: 'boolean',
			default: false,
			description: 'Whether the user can organize recipes',
			displayOptions: {
				show: {
					operation: [CreateUserOperation.OperationId],
				},
			},
		},
	];
}
