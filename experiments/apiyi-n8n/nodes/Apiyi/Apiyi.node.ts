import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class Apiyi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'APIYI',
    name: 'apiyi',
    icon: 'file:apiyi.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Call APIYI chat or image generation models',
    defaults: { name: 'APIYI' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [{ name: 'apiyiApi', required: true }],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Chat', value: 'chat', description: 'Generate a chat completion', action: 'Generate a chat completion' },
          { name: 'Image', value: 'image', description: 'Generate an image', action: 'Generate an image' },
        ],
        default: 'chat',
      },
      {
        displayName: 'Model',
        name: 'chatModel',
        type: 'options',
        displayOptions: { show: { operation: ['chat'] } },
        options: [
          { name: 'GPT-5', value: 'gpt-5' },
          { name: 'Claude Sonnet', value: 'claude-sonnet-4-5' },
          { name: 'Gemini 2.5 Pro', value: 'gemini-2.5-pro' },
          { name: 'DeepSeek Chat', value: 'deepseek-chat' },
        ],
        default: 'gpt-5',
      },
      {
        displayName: 'Prompt',
        name: 'prompt',
        type: 'string',
        typeOptions: { rows: 5 },
        default: '',
        required: true,
      },
      {
        displayName: 'Image Model',
        name: 'imageModel',
        type: 'options',
        displayOptions: { show: { operation: ['image'] } },
        options: [
          { name: 'Nano Banana Pro', value: 'gemini-3-pro-image' },
          { name: 'GPT Image 1', value: 'gpt-image-1' },
          { name: 'Flux Pro', value: 'flux-pro-1.1' },
        ],
        default: 'gemini-3-pro-image',
      },
      {
        displayName: 'Size',
        name: 'size',
        type: 'options',
        displayOptions: { show: { operation: ['image'] } },
        options: [
          { name: 'Square', value: '1024x1024' },
          { name: 'Landscape', value: '1920x1080' },
          { name: 'Portrait', value: '1080x1920' },
        ],
        default: '1024x1024',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const credentials = await this.getCredentials('apiyiApi');
    const baseUrl = String(credentials.baseUrl).replace(/\/$/, '');
    const apiKey = String(credentials.apiKey);
    const output: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter('operation', i) as string;
      const prompt = this.getNodeParameter('prompt', i) as string;

      try {
        if (operation === 'chat') {
          const model = this.getNodeParameter('chatModel', i) as string;
          const body = await this.helpers.httpRequest({
            method: 'POST',
            url: `${baseUrl}/v1/chat/completions`,
            headers: { Authorization: `Bearer ${apiKey}` },
            body: { model, messages: [{ role: 'user', content: prompt }] },
            json: true,
            timeout: 120000,
          });
          output.push({ json: body as object, pairedItem: { item: i } });
        } else {
          const model = this.getNodeParameter('imageModel', i) as string;
          const size = this.getNodeParameter('size', i) as string;
          const body = await this.helpers.httpRequest({
            method: 'POST',
            url: `${baseUrl}/v1/images/generations`,
            headers: { Authorization: `Bearer ${apiKey}` },
            body: { model, prompt, n: 1, size },
            json: true,
            timeout: 120000,
          });
          output.push({ json: body as object, pairedItem: { item: i } });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          output.push({ json: { error: error instanceof Error ? error.message : String(error) }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }

    return [output];
  }
}
