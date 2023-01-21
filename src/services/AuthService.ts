import { TokenRequest } from './../dto/token'
import { AuthResponse, IUserLoginForm, IUserRegisterForm } from 'dto/user'
import { IUser } from 'dto/user'
import APIClient from 'cores/APIClient'
import { RequestMethod, RequestType } from 'cores/BaseAPIClient'
import * as SecureStore from 'expo-secure-store'
import { AxiosError } from 'axios'

class AuthService {
  static client = new APIClient({})

  static async checkAPI() {
    return this.client.fetch<IUser>({
      path: '/',
      method: RequestMethod.Get,
    })
  }

  static async login(body: IUserLoginForm) {
    const data = await this.client.fetch<AuthResponse>({
      path: '/login',
      method: RequestMethod.Post,
      body: body,
      type: RequestType.Form,
    })

    await SecureStore.setItemAsync('accessToken', data.accessToken)
    await SecureStore.setItemAsync('refreshToken', data.refreshToken)

    return data
  }

  static async register(body: IUserRegisterForm) {
    const data = await this.client.fetch<AuthResponse>({
      path: '/register',
      method: RequestMethod.Post,
      body: body,
    })

    await SecureStore.setItemAsync('accessToken', data.accessToken)
    await SecureStore.setItemAsync('refreshToken', data.refreshToken)

    return data
  }

  static async refreshToken() {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken')
      const refreshToken = await SecureStore.getItemAsync('refreshToken')

      if (!accessToken || !refreshToken) return

      const data = await this.client.fetch<TokenRequest, TokenRequest>({
        path: '/refresh',
        method: RequestMethod.Post,
        body: {
          accessToken,
          refreshToken,
        },
      })

      await SecureStore.setItemAsync('accessToken', data.accessToken)
      await SecureStore.setItemAsync('accessToken', data.refreshToken)

      return data
    } catch (e) {
      const { response } = e as AxiosError

      alert(response?.data?.detail)
    }
  }
}

export default AuthService
