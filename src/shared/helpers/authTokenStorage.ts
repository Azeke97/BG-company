import { StorageKeys } from '~/shared/constants'
import type { Nullable, Timestamp } from '~/shared/types'

export interface TokenData {
  token: string
  expired: Timestamp
}

let cachedTokenData: Nullable<TokenData> = null

export const authTokenStorage = {
  get(): Nullable<TokenData> {
    if (!cachedTokenData) {
      const tokenString = localStorage.getItem(StorageKeys.AuthToken)

      return tokenString ? JSON.parse(tokenString) : null
    }

    return cachedTokenData
  },

  set(tokenData: TokenData) {
    cachedTokenData = tokenData
    localStorage.setItem(StorageKeys.AuthToken, JSON.stringify(tokenData))
  },

  reset() {
    cachedTokenData = null
    localStorage.removeItem(StorageKeys.AuthToken)
  },
}
