import { IUpdateUser, IUser } from 'dto/user'
import APIClient from 'cores/APIClient'
import { RequestMethod } from 'cores/BaseAPIClient'
import { IFoodHistoryList } from 'dto/history'

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

  static async updateUserData(userId: string, userData: IUpdateUser) {
    return this.client.fetch<IUser>({
      path: `/${userId}`,
      method: RequestMethod.Patch,
      body: userData,
    })
  }

  static async getUserHistory(userId: string) {
    return this.client.fetch<IFoodHistoryList>({
      path: `/history/${userId}`,
      method: RequestMethod.Get,
      params: {
        start: 0,
        limit: 100,
      },
    })
  }

  static async setUserAsReady(userId: string) {
    return this.client.fetch<IUser>({
      path: `/ready/${userId}`,
      method: RequestMethod.Patch,
    })
  }
}

export default UserService
