import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ApiyiApi implements ICredentialType {
  name = 'apiyiApi';
  displayName = 'APIYI API';
  documentationUrl = 'https://help.apiyi.com/';
  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://vip.apiyi.com',
      required: true,
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
    },
  ];
}
