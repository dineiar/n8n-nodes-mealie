import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CreateRecipe implements MealieN8nOperation {
	static readonly OperationId = 'createRecipe';
	static readonly Operation: INodePropertyOptions = {
		name: 'Create Recipe',
		value: CreateRecipe.OperationId,
		action: 'Create a recipe from individual fields',
		description: 'Create a recipe by providing individual fields like name, ingredients, and instructions',
		routing: {
			request: {
				method: 'POST',
				url: '/api/recipes/create/html-or-json',
			},
			output: {
				postReceive: [
					async function (this, items) {
						// Get the parseOutput option (default to true)
						const additionalOptions = this.getNodeParameter('additionalOptions', {}) as {
							parseOutput?: boolean;
						};
						const parseOutput = additionalOptions.parseOutput ?? true;

						if (!parseOutput) {
							// Return raw response if parseOutput is disabled
							return items;
						}

						// Transform the response to have a slug key
						return items.map((item) => {
							let slug;

							// Handle different response formats
							if (typeof item.json === 'string') {
								// Direct string response
								slug = item.json;
							} else if (Array.isArray(item.json)) {
								// Array response
								slug = item.json[0];
							} else if (item.json && typeof item.json === 'object') {
								// Already an object, might already have slug
								slug = item.json.slug || item.json;
							} else {
								slug = item.json;
							}

							return {
								json: {
									slug: slug,
								},
								pairedItem: item.pairedItem,
							};
						});
					},
				],
			},
			send: {
				preSend: [
					async function (this, requestOptions) {
						// Get additional options
						const additionalOptions = this.getNodeParameter('additionalOptions', {}) as {
							includeTags?: boolean;
							url?: string;
						};
						const includeTags = additionalOptions.includeTags ?? true;
						const url = additionalOptions.url ?? '';

						// Simple mode - build JSON-LD from individual fields
						const recipeName = this.getNodeParameter('recipeName') as string;
						const description = this.getNodeParameter('description', '') as string;
						const recipeCategory = this.getNodeParameter('recipeCategory', '') as string;
						const recipeCuisine = this.getNodeParameter('recipeCuisine', '') as string;
						const keywords = this.getNodeParameter('keywords', '') as string;
						const recipeYield = this.getNodeParameter('recipeYield', '') as string;
						const prepTime = this.getNodeParameter('prepTime', '') as string;
						const cookTime = this.getNodeParameter('cookTime', '') as string;
						const totalTime = this.getNodeParameter('totalTime', '') as string;
						const imageUrl = this.getNodeParameter('imageUrl', '') as string;

						// Check if using advanced list mode for ingredients
						const ingredientsMode = this.getNodeParameter('ingredientsMode') as string;
						let ingredients: string[] = [];

						if (ingredientsMode === 'json') {
							// JSON array mode
							const ingredientsJson = this.getNodeParameter('ingredientsJson') as string;
							try {
								ingredients = JSON.parse(ingredientsJson);
								if (!Array.isArray(ingredients)) {
									throw new Error('Ingredients JSON must be an array');
								}
							} catch (error) {
								throw new Error(`Invalid JSON for ingredients: ${error.message}`);
							}
						} else {
							// UI mode (fixedCollection)
							const ingredientsData = this.getNodeParameter('ingredientsUi', {}) as {
								ingredientValues?: Array<{ ingredient: string }>;
							};
							ingredients = ingredientsData.ingredientValues?.map(item => item.ingredient) || [];
						}

						// Check if using advanced list mode for instructions
						const instructionsMode = this.getNodeParameter('instructionsMode') as string;
						let instructions: Array<{ '@type': string; text: string }> = [];

						if (instructionsMode === 'json') {
							// JSON array mode
							const instructionsJson = this.getNodeParameter('instructionsJson') as string;
							try {
								const instructionsArray = JSON.parse(instructionsJson);
								if (!Array.isArray(instructionsArray)) {
									throw new Error('Instructions JSON must be an array');
								}
								instructions = instructionsArray.map(step => ({
									'@type': 'HowToStep',
									text: step,
								}));
							} catch (error) {
								throw new Error(`Invalid JSON for instructions: ${error.message}`);
							}
						} else {
							// UI mode (fixedCollection)
							const instructionsData = this.getNodeParameter('instructionsUi', {}) as {
								instructionValues?: Array<{ step: string }>;
							};
							instructions = instructionsData.instructionValues?.map(item => ({
								'@type': 'HowToStep',
								text: item.step,
							})) || [];
						}

						// Validate required fields
						if (ingredients.length === 0) {
							throw new Error('At least one ingredient is required to create a recipe');
						}

						if (instructions.length === 0) {
							throw new Error('At least one instruction step is required to create a recipe');
						}

						// Build JSON-LD object
						const jsonLd: Record<string, unknown> = {
							'@context': 'https://schema.org',
							'@type': 'Recipe',
							name: recipeName,
						};

						// Add optional fields only if they have values
						if (description) jsonLd.description = description;
						if (recipeCategory) jsonLd.recipeCategory = recipeCategory;
						if (recipeCuisine) jsonLd.recipeCuisine = recipeCuisine;
						if (keywords) jsonLd.keywords = keywords;
						if (recipeYield) jsonLd.recipeYield = recipeYield;
						if (prepTime) jsonLd.prepTime = prepTime;
						if (cookTime) jsonLd.cookTime = cookTime;
						if (totalTime) jsonLd.totalTime = totalTime;
						if (imageUrl) jsonLd.image = imageUrl;
						if (ingredients.length > 0) jsonLd.recipeIngredient = ingredients;
						if (instructions.length > 0) jsonLd.recipeInstructions = instructions;

						const data = JSON.stringify(jsonLd);

						// Build the request body
						const body: Record<string, unknown> = {
							data,
							includeTags,
						};

						if (url) {
							body.url = url;
						}

						requestOptions.body = body;
						return requestOptions;
					},
				],
			},
		},
	};

	static readonly Fields: INodeProperties[] = [
		// ============ SIMPLE MODE FIELDS ============

		{
			displayName: 'Recipe Name',
			name: 'recipeName',
			type: 'string',
			required: true,
			default: '',
			description: 'The name of the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Description',
			name: 'description',
			type: 'string',
			typeOptions: {
				rows: 4,
			},
			default: '',
			description: 'A description of the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},

		// ============ INGREDIENTS SECTION ============

		{
			displayName: 'Ingredients Input Mode',
			name: 'ingredientsMode',
			type: 'options',
			options: [
				{
					name: 'Add One by One',
					value: 'ui',
					description: 'Add ingredients individually using the UI',
				},
				{
					name: 'JSON Array',
					value: 'json',
					description: 'Provide ingredients as a JSON array (ideal for automation)',
				},
			],
			default: 'ui',
			description: 'Choose how to input ingredients',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Ingredients',
			name: 'ingredientsUi',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
				sortable: true,
			},
			default: {},
			placeholder: 'Add Ingredient',
			description: 'List of ingredients for the recipe. At least one ingredient is required.',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
					ingredientsMode: ['ui'],
				},
			},
			options: [
				{
					name: 'ingredientValues',
					displayName: 'Ingredient',
					values: [
						{
							displayName: 'Ingredient',
							name: 'ingredient',
							type: 'string',
							default: '',
							placeholder: 'e.g., 2 cups flour',
							description: 'An ingredient with quantity and unit',
						},
					],
				},
			],
		},
		{
			displayName: 'Ingredients (JSON Array)',
			name: 'ingredientsJson',
			type: 'string',
			typeOptions: {
				rows: 6,
			},
			required: true,
			default: '["2 cups flour", "1 tsp salt", "1 cup water"]',
			placeholder: '["ingredient 1", "ingredient 2", "ingredient 3"]',
			description: 'Ingredients as a JSON array of strings. At least one ingredient is required.',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
					ingredientsMode: ['json'],
				},
			},
		},

		// ============ INSTRUCTIONS SECTION ============

		{
			displayName: 'Instructions Input Mode',
			name: 'instructionsMode',
			type: 'options',
			options: [
				{
					name: 'Add One by One',
					value: 'ui',
					description: 'Add instruction steps individually using the UI',
				},
				{
					name: 'JSON Array',
					value: 'json',
					description: 'Provide instructions as a JSON array (ideal for automation)',
				},
			],
			default: 'ui',
			description: 'Choose how to input instructions',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Instructions',
			name: 'instructionsUi',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
				sortable: true,
			},
			default: {},
			placeholder: 'Add Step',
			description: 'Step-by-step instructions for the recipe. At least one step is required.',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
					instructionsMode: ['ui'],
				},
			},
			options: [
				{
					name: 'instructionValues',
					displayName: 'Step',
					values: [
						{
							displayName: 'Step',
							name: 'step',
							type: 'string',
							typeOptions: {
								rows: 2,
							},
							default: '',
							placeholder: 'e.g., Preheat the oven to 350°F',
							description: 'A single instruction step',
						},
					],
				},
			],
		},
		{
			displayName: 'Instructions (JSON Array)',
			name: 'instructionsJson',
			type: 'string',
			typeOptions: {
				rows: 8,
			},
			required: true,
			default: '["Preheat the oven to 350°F", "Mix dry ingredients", "Add wet ingredients and stir", "Bake for 30 minutes"]',
			placeholder: '["step 1", "step 2", "step 3"]',
			description: 'Instructions as a JSON array of strings. At least one step is required.',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
					instructionsMode: ['json'],
				},
			},
		},

		// ============ OTHER RECIPE FIELDS ============

		{
			displayName: 'Category',
			name: 'recipeCategory',
			type: 'string',
			default: '',
			placeholder: 'e.g., Dessert, Main Course, Appetizer',
			description: 'The category of the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Cuisine',
			name: 'recipeCuisine',
			type: 'string',
			default: '',
			placeholder: 'e.g., Italian, Mexican, Japanese',
			description: 'The cuisine type of the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Keywords',
			name: 'keywords',
			type: 'string',
			default: '',
			placeholder: 'e.g., quick, easy, vegetarian',
			description: 'Comma-separated keywords for the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Yield',
			name: 'recipeYield',
			type: 'string',
			default: '',
			placeholder: 'e.g., 4 servings, 1 loaf',
			description: 'The quantity produced by the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Prep Time',
			name: 'prepTime',
			type: 'string',
			default: '',
			placeholder: 'e.g., PT15M (15 minutes)',
			description: 'Preparation time in ISO 8601 duration format (PT#H#M)',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Cook Time',
			name: 'cookTime',
			type: 'string',
			default: '',
			placeholder: 'e.g., PT1H (1 hour)',
			description: 'Cooking time in ISO 8601 duration format (PT#H#M)',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Total Time',
			name: 'totalTime',
			type: 'string',
			default: '',
			placeholder: 'e.g., PT1H15M (1 hour 15 minutes)',
			description: 'Total time in ISO 8601 duration format (PT#H#M)',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},
		{
			displayName: 'Image URL',
			name: 'imageUrl',
			type: 'string',
			default: '',
			placeholder: 'https://example.com/recipe-image.jpg',
			description: 'URL of the recipe image',
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
		},

		// ============ COMMON FIELDS ============

		{
			displayName: 'Additional Options',
			name: 'additionalOptions',
			type: 'collection',
			placeholder: 'Show Additional Options',
			default: {},
			displayOptions: {
				show: {
					operation: [CreateRecipe.OperationId],
				},
			},
			options: [
				{
					displayName: 'Include Tags',
					name: 'includeTags',
					type: 'boolean',
					default: true,
					description: 'Whether to include tags from the parsed recipe data',
				},
				{
					displayName: 'Source URL',
					name: 'url',
					type: 'string',
					default: '',
					placeholder: 'https://example.com/original-recipe',
					description: 'Optional URL of the original recipe source',
				},
				{
					displayName: 'Parse Output',
					name: 'parseOutput',
					type: 'boolean',
					default: true,
					description: 'Whether to parse the response array into a structured object with "slug" key. If disabled, returns the raw array response from the API.',
				},
			],
		},
	];
}