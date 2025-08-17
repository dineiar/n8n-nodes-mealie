import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class UpdateUserOperation implements MealieN8nOperation {
  static readonly OperationId = 'usersCrudUpdateUser';
  static readonly Operation: INodePropertyOptions = {
    name: 'Update User',
    value: UpdateUserOperation.OperationId,
    action: 'Update a user',
    description: 'Update a user by ID',
    routing: {
      request: {
        method: 'PUT',
        url: '=/api/users/{{$parameter.userId}}',
        body: {
          id: '={{$parameter.userId}}',
          username: '={{$parameter.username}}',
          fullName: '={{$parameter.fullName}}',
          email: '={{$parameter.email}}',
          authMethod: '={{$parameter.authMethod}}',
          admin: '={{$parameter.admin}}',
          group: '={{$parameter.group}}',
          household: '={{$parameter.household}}',
          advanced: '={{$parameter.advanced}}',
          canInvite: '={{$parameter.canInvite}}',
          canManage: '={{$parameter.canManage}}',
          canManageHousehold: '={{$parameter.canManageHousehold}}',
          canOrganize: '={{$parameter.canOrganize}}',
        },
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
      description: 'The ID of the user to update',
      displayOptions: {
        show: {
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Username',
      name: 'username',
      type: 'string',
      default: '',
      description: 'The username of the user',
      displayOptions: {
        show: {
          operation: [UpdateUserOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Full Name',
      name: 'fullName',
      type: 'string',
      default: '',
      description: 'The full name of the user',
      displayOptions: {
        show: {
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
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
          operation: [UpdateUserOperation.OperationId],
        },
      },
    },
  ];
}
