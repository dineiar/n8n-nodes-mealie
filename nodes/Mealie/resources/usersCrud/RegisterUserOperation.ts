import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class RegisterUserOperation implements MealieN8nOperation {
	static readonly OperationId = 'registerUser';
	static readonly Operation: INodePropertyOptions = {
		name: 'Register New User',
		value: RegisterUserOperation.OperationId,
		action: 'Register a new user',
		description: 'Register a new user in Mealie',
		routing: {
			request: {
				method: 'POST',
				url: '/api/users/register',
				body: {
					email: '={{$parameter.email}}',
					username: '={{$parameter.username}}',
					fullName: '={{$parameter.fullName}}',
					password: '={{$parameter.password}}',
					passwordConfirm: '={{$parameter.password}}',
					groupToken: '={{$parameter.groupToken}}',
					advanced: '={{$parameter.advanced}}',
					private: '={{$parameter.private}}',
					seedData: '={{$parameter.seedData}}',
					locale: '={{$parameter.locale}}',
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
			description: 'The email address of the user',
			displayOptions: {
				show: {
					operation: [RegisterUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'User Name',
			name: 'username',
			type: 'string',
			placeholder: 'username',
			required: true,
			default: '',
			description: 'The username of the user',
			displayOptions: {
				show: {
					operation: [RegisterUserOperation.OperationId],
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
					operation: [RegisterUserOperation.OperationId],
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
					operation: [RegisterUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Group Token',
			name: 'groupToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'The Group Token that allows the user to sign-in. This is generated using the Invite feature inside Mealie.',
			displayOptions: {
				show: {
					operation: [RegisterUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Advanced User',
			name: 'advanced',
			type: 'boolean',
			required: true,
			default: false,
			description: 'Whether the user is an advanced user',
			displayOptions: {
				show: {
					operation: [RegisterUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Private User',
			name: 'private',
			type: 'boolean',
			required: true,
			default: false,
			description: 'Whether the user is a private user',
			displayOptions: {
				show: {
					operation: [RegisterUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Seed Data',
			name: 'seedData',
			type: 'boolean',
			required: true,
			default: false,
			description: 'Whether to seed the user with initial data',
			displayOptions: {
				show: {
					operation: [RegisterUserOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Locale',
			name: 'locale',
			type: 'string',
			required: true,
			default: 'en-US',
			description: 'The locale of the user',
			displayOptions: {
				show: {
					operation: [RegisterUserOperation.OperationId],
				},
			},
		},
	];
}
