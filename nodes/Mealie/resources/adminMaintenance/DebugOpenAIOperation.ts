import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class DebugOpenAIOperation implements MealieN8nOperation {
  static readonly OperationId = 'debugOpenAI';
  static readonly Operation: INodePropertyOptions = {
    name: 'Debug OpenAI',
    value: DebugOpenAIOperation.OperationId,
    action: 'Debug OpenAI integration',
    description: 'Debug and test OpenAI integration',
    routing: {
      request: {
        method: 'POST',
        url: '/api/admin/debug/openai',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
