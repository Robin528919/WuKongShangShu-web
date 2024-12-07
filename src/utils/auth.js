import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const localTokenKey = 'Admin-Token-Local'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}



export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setLocaToken(token) {
  return  Cookies.set(localTokenKey, token)
}

export function getLocaToken(token) {
  return Cookies.get(localTokenKey, token)
}
export function removeLocalToken() {
  return Cookies.remove(localTokenKey)
}

