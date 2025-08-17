# n8n-nodes-mealie

This is an n8n community node that implements the [Mealie](https://mealie.io/) Recipe Management API into n8n to automate workflows.

## Description

### Credentials

This node supports two authentication types:

- **Mealie No Auth API**: For public endpoints that don't require authentication (e.g., App: About, User: Login). Only requires your Mealie base URL.
- **Mealie API Token API**: Authenticates using a Bearer token generated from your Mealie instance. Requires your Mealie base URL and an API token. This is the recommended authentication method for most use cases. The token can be either a long-lived token generated on the Mealie instance (see [documentation](https://docs.mealie.io/documentation/getting-started/api-usage/#pagination)) or generated on-the-fly using the User: Login operation. In the second case, you might want to use dynamic expressions in the credentials definition on n8n (e.g., `{{ $json.access_token }}`)

To obtain an API token, log into your Mealie instance and navigate to the user settings to generate a new API token.

### Available Resources and Operations

The following Mealie API resources are currently implemented in this node:

#### **Application Resources**

- **App: About** - General application information. *These endpoints are public and do not require an authentication token*.
  - Get app about information
  - Get app startup information
  - Get app theme information

#### **Admin Resources**

- **Admin: About** - Administrative information about the Mealie instance
  - Get app information
  - Get app statistics
  - Check app configuration

- **Admin: Backups** - Database backup management for administrators
  - Get all backups
  - Create backup
  - Get specific backup
  - Delete backup
  - Upload backup
  - Restore backup

- **Admin: Manage Households** - Household management for administrators
  - Get all households
  - Create household
  - Get specific household
  - Update household
  - Delete household

- **Admin: Manage Users** - User management for administrators
  - Get all users
  - Create user
  - Get specific user
  - Update user
  - Delete user
  - Unlock users
  - Generate password reset token

#### **Group/Household Resources**

- **Groups: Households** - Group-level household operations
  - Get all households
  - Get specific household

- **Households: Invitations** - Household invitation management
  - Create invite token
  - Get invite tokens
  - Send email invitation

#### **User Resources**

- **Users: Authentication** - User authentication operations
  - Login
  - Logout
  - Refresh token
  - OAuth callback
  - OAuth login

- **Users: CRUD** - User profile and data management
  - Get self information
  - Get self ratings
  - Get self favorites
  - Register user
  - Update password
  - Update user profile

- **Users: Ratings** - User rating operations
  - Various rating-related operations

- **Users: Tokens** - API token management
  - Create API token
  - Delete API token



## Installing n8n-nodes-mealie

To install a custom node in n8n, follow these steps:

1. Refer to the official documentation: [n8n Custom Node Installation](https://docs.n8n.io/integrations/community-nodes/installation/)

2. Choose the custom node you want to install, `n8n-nodes-mealie`.

3. Follow the instructions provided in the documentation to install and configure the custom node.

For detailed installation steps and configuration options, please visit the official n8n documentation linked above.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
