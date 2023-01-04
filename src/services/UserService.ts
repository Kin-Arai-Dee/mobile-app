import { IUser } from 'dto/user'
import APIClient from 'cores/APIClient'
import { RequestMethod } from 'cores/BaseAPIClient'

class UserService {
  static client = new APIClient({
    pathPrefix: '/user',
  })

  static async getUserData() {
    return this.client.fetch<IUser>({
      path: '/me',
      method: RequestMethod.Get,
    })
  }

  static async updateUserData(userId: string) {
    return this.client.fetch<IUser>({
      path: `/${userId}`,
      method: RequestMethod.Patch,
    })
  }

  static async getUserHistory(userId: string) {
    return this.client.fetch<IUser>({
      path: `/history/${userId}`,
      method: RequestMethod.Get,
      params: {
        start: 0,
        limit: 100,
      },
    })
  }
}

export default UserService
