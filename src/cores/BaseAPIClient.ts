import axios, {
  AxiosInstance,
  CancelToken,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios'
import axiosRetry, { isSafeRequestError } from 'axios-retry'
import { set } from 'lodash'
import qs from 'qs'
import * as SecureStore from 'expo-secure-store'

export enum RequestMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export interface ClientConfig {
  apiEndpoint: string
  defaultTimeout?: number
  defaultRetryTimes?: number
}

export enum ContentType {
  UrlEncodedForm = 'application/x-www-form-urlencoded',
  Json = 'application/json',
  Multipart = 'multipart/form-data',
}

export enum RequestType {
  Form = 'form',
  Json = 'json',
  Multipart = 'multipart',
}

export interface RequestConfig<Body extends object, Params extends object> {
  path: string
  method: RequestMethod
  body?: Body
  cancelToken?: CancelToken
  headers?: AxiosRequestHeaders
  params?: Params
  retryTimes?: number
  forceUpdate?: boolean
  type?: RequestType
  additionalConfig?: Partial<AxiosRequestConfig>
}

class BaseAPIClient {
  client: AxiosInstance

  constructor({
    apiEndpoint,
    defaultTimeout,
    defaultRetryTimes = 3,
  }: ClientConfig) {
    this.client = axios.create({
      baseURL: apiEndpoint,
      timeout: defaultTimeout,
    })

    axiosRetry(this.client, {
      retryCondition: isSafeRequestError,
      retries: defaultRetryTimes,
    })

    this.client.interceptors.request.use(async requestConfig => {
      const token = await SecureStore.getItemAsync('accessToken')

      if (requestConfig.headers && token) {
        requestConfig.headers['Authorization'] = `Bearer ${token}`
      }

      return requestConfig
    })
  }

  async fetch<
    Response,
    Body extends object = object,
    Params extends object = object
  >({
    body,
    cancelToken,
    headers,
    method,
    params,
    path,
    retryTimes,
    type = RequestType.Json,
    additionalConfig,
  }: RequestConfig<Body, Params>) {
    const request: AxiosRequestConfig = {
      ...additionalConfig,
      cancelToken,
      headers,
      method,
      params,
      url: path,
    }

    if (retryTimes) {
      request['axios-retry'] = {
        retries: retryTimes,
      }
    }

    if (
      [RequestMethod.Post, RequestMethod.Put, RequestMethod.Patch].includes(
        method
      )
    ) {
      switch (type) {
        case RequestType.Form:
          set(request, ['headers', 'content-type'], ContentType.UrlEncodedForm)
          request.data = qs.stringify(body, { allowDots: true })
          break
        case RequestType.Multipart:
          set(request, ['headers', 'content-type'], ContentType.Multipart)
          const formData = new FormData()

          Object.entries(body!).forEach(([key, values]) => {
            formData.append(key, values)
          })
          request.data = formData
          break
        default:
          request.data = body
          break
      }
    }

    const response = await this.client.request<Response>(request)
    return response.data
  }
}

export default BaseAPIClient
