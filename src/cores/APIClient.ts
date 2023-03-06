import BaseAPIClient, { ClientConfig } from './BaseAPIClient'
import { BASE_API_URL } from '@env'

class APIClient extends BaseAPIClient {
  constructor({
    pathPrefix = '',
    ...config
  }: Omit<ClientConfig, 'apiEndpoint'> & {
    pathPrefix?: string
  }) {
    super({
      apiEndpoint: `http://localhost:8000/api/v1${pathPrefix}`,
      ...config,
    })
  }
}

export default APIClient
