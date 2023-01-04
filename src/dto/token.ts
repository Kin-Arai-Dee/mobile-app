export interface TokenRequest {
  accessToken: string
  refreshToken: string
}

export interface TokenResponse extends TokenRequest {
  tokenExpire: string
  refreshTokenExpire: string
  tokenType: string
}
