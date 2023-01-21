import { IUser, IUserLoginForm, IUserRegisterForm } from 'dto/user'
import React, { ReactNode, useState, useContext, createContext } from 'react'
import { useEffect } from 'react'
import AuthService from 'services/AuthService'
import UserService from 'services/UserService'
import Spinner from 'react-native-loading-spinner-overlay/lib'

export interface AuthContextValue {
  user: IUser
  setUser: (user: IUser) => void
  login: (loginForm: IUserLoginForm) => Promise<void>
  register: (registerForm: IUserRegisterForm) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextValue)

export const useAuthContext = () => useContext(AuthContext)

export interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [ready, setReady] = useState(false)

  const login = async (loginForm: IUserLoginForm) => {
    const { user: userData } = await AuthService.login(loginForm)

    setUser(userData)
  }

  const register = async (registerForm: IUserRegisterForm) => {
    const { user: userData } = await AuthService.register(registerForm)

    setUser(userData)
  }

  const setUserByToken = async () => {
    const userData = await UserService.getUserData()

    setUser(userData)
  }

  useEffect(() => {
    setUserByToken().finally(() => {
      setReady(true)
    })
  }, [])

  if (!ready) {
    return <Spinner visible textContent="loading" />
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}
