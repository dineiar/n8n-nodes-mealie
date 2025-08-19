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

- **Admin: Maintenance** - System maintenance operations for administrators
  - Maintenance mode management
  - System health checks
  - Debug OpenAI

- **Admin: Manage Groups** - Group management for administrators
  - Get all groups
  - Create group
  - Get specific group
  - Update group
  - Delete group

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
  - Get user ratings
  - Get user favorites

- **Users: Tokens** - API token management
  - Create API token
  - Delete API token



## Installing n8n-nodes-mealie

To install a custom node in n8n, follow these steps:

1. Refer to the official documentation: [n8n Custom Node Installation](https://docs.n8n.io/integrations/community-nodes/installation/)

2. Choose the custom node you want to install, `n8n-nodes-mealie`.

3. Follow the instructions provided in the documentation to install and configure the custom node.

For detailed installation steps and configuration options, please visit the official n8n documentation linked above.

## Roadmap

The following Mealie API endpoints are yet to be implemented in this node:

#### **Admin Resources**

- **Admin: Email** - Email system management for administrators
  - Check Email configuration
  - Send test email

#### **Recipe Management Resources**

- **Recipe: Exports** - Recipe export functionality
  - Get recipe formats and templates
  - Export recipes
  - Export recipes as zip

- **Recipe: CRUD** - Core recipe operations
  - CRUD for recipes
  - Test parsing recipe
  - Create recipe from HTML or JSON
  - Create recipe from image
  - Create recipe from zip
  - Suggest recipe
  - Duplicate recipe
  - Update last made

- **Recipe: Images and Assets** - Recipe media management
  - CRUD for recipe image
  - CRUD for recipe assets
  - Image processing operations

- **Recipe: Comments** - Recipe commenting system
  - CRUD for recipe comments

- **Recipe: Bulk Actions** - Bulk recipe operations
  - Bulk parse recipe URL
  - Bulk tag recipes
  - Bulk settings recipes
  - Bulk categorize recipes
  - Bulk recipe CRUD

- **Recipe: Shared** - Recipe sharing functionality
  - Share recipes
  - CRUD for sharing recipes

- **Recipe: Timeline** - Recipe timeline and history
  - CRUD for recipe timeline/events

- **Recipe: Ingredient Parser** - Ingredient parsing utilities
  - Parse single ingredient
  - Parse multiple ingredients

#### **Household Management Resources**

- **Households: Cookbooks** - Cookbook management within households
  - Get all cookbooks
  - Create cookbook
  - Get specific cookbook
  - Update cookbook
  - Delete cookbook

- **Households: Event Notifications** - Event notification system
  - Get event notifications
  - Manage notification settings
  - Test event notification
  - Event subscription management

- **Households: Mealplans** - Meal planning functionality
  - CRUD for mealplans
  - Get today meals
  - Create random meal

- **Households: Mealplan Rules** - Mealplan automation rules
  - CRUD for mealplan rules

- **Households: Recipe Actions** - Recipe action automation
  - Get recipe actions
  - Create recipe action
  - Execute/trigger recipe action

- **Households: Self Service** - Self-service household operations
  - Various self-service operations for household members

- **Households: Shopping Lists** - Shopping list management
  - Get all shopping lists
  - Create shopping list
  - Get specific shopping list
  - Update shopping list
  - Delete shopping list

- **Households: Shopping List Items** - Shopping list item management
  - Get shopping list items
  - Add item to shopping list
  - Update shopping list item
  - Remove item from shopping list
  - Bulk operations on shopping list items

- **Households: Webhooks** - Webhook management for households
  - Get webhooks
  - Create webhook
  - Update webhook
  - Delete webhook
  - Test webhook

#### **Group Resources**

- **Groups: Self Service** - Self-service group operations
  - Various self-service operations for group members

- **Groups: Migrations** - Data migration operations
  - Import data from other systems
  - Migration status and management

- **Groups: Reports** - Reporting and analytics
  - Get reports
  - Delete reports

- **Groups: Multi Purpose Labels** - Label management system
  - CRUD for labels

- **Groups: Seeders** - Database seeding utilities
  - Seed foods
  - Seed labels
  - Seed units

#### **Organization Resources**

- **Organizer: Categories** - Recipe category management
  - CRUD for categories

- **Organizer: Tags** - Recipe tag management
  - CRUD for tags

- **Organizer: Tools** - Recipe tool management
  - CRUD for tools

#### **Recipe Data Resources**

- **Recipes: Foods** - Food/ingredient database
  - CRUD for foods

- **Recipes: Units** - Unit of measurement management
  - CRUD for units

#### **Exploration Resources**

- **Explore: Foods** - Public food database exploration
  - Browse food database
  - Food information lookup

- **Explore: Households** - Public household exploration
  - Browse public households
  - Household discovery

- **Explore: Categories** - Public category exploration
  - Browse recipe categories
  - Category-based recipe discovery

- **Explore: Tags** - Public tag exploration
  - Browse recipe tags
  - Tag-based recipe discovery

- **Explore: Tools** - Public tool exploration
  - Browse recipe tools
  - Tool-based recipe discovery

- **Explore: Cookbooks** - Public cookbook exploration
  - Browse public cookbooks
  - Cookbook discovery

- **Explore: Recipes** - Public recipe exploration
  - Browse public recipes
  - Recipe search and discovery

#### **User Resources**

- **Users: Images** - User profile image management
  - Update user profile image
  - Get user profile image

- **Users: Passwords** - Password management operations
  - Forgot password
  - Reset password
  - Password recovery

- **Users: Ratings** - User rating operations
  - Set user rating
  - Add user favorite
  - Remove user favorite

#### **Utility Resources**

- **Utils** - Utility operations
  - Download file

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
