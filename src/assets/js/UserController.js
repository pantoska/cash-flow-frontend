import { configConst } from './const'
import axios from 'axios'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

export default class UserController {
  static isLoggedIn () {
    const cookieBearer = Cookies.get('Basic')
    return !(cookieBearer === undefined || cookieBearer === '')
  }

  static getUserId () {
    return Cookies.get('userId')
  }

  static userIsAdmin () {
    const role = Cookies.get('rol')
    if (role === undefined || role !== '1') {
      return false
    }
    return true
  }

  static getUserToken () {
    const cookieToken = Cookies.get('Basic')
    const userId = Cookies.get('userId')
    const role = Cookies.get('rol')
    Cookies.set('Basic', cookieToken, { expires: 14 })
    Cookies.set('userId', userId, { expires: 14 })
    Cookies.set('rol', role, { expires: 14 })
    return cookieToken
  }

  static getUserTokenHeader () {
    return 'Basic ' + UserController.getUserToken()
  }

  static logout () {
    Cookies.remove('Basic', { path: '/' })
    Cookies.remove('userId', { path: '/' })
    Cookies.remove('rol', { path: '/' })
  }

  static login (email, password) {
    const hash = CryptoJS.MD5(password)
    const bauth = btoa(email + ':' + hash.toString())
    return axios({
      method: 'GET',
      url: configConst.serverUrl + 'user/' + email,
      withCredentials: true,
      headers: {
        Authorization: 'Basic ' + bauth
      }
    })
      .then(r => {
        if (r.status === 200) {
          Cookies.set('Basic', bauth, { expires: 14 })
          Cookies.set('userId', r.data.id_user, { expires: 14 })

          UserController.getUserData().then(result => {
            if (result !== 0 || result !== -1) {
              Cookies.set('rol', result.role, { expires: 14 })
            }
          })
          return 1
        } else if (r.status === 204) {
          return 0
        } else {
          return -1
        }
      })
      .catch(r => {
        if (r.status === 401) {
          return 0
        } else {
          return -1
        }
      })
  }

  static createNewUser (email, password, name) {
    const data = {
      email: email,
      name: name,
      password: CryptoJS.MD5(password).toString()
    }
    return axios({
      method: 'PUT',
      url: configConst.serverUrl + 'user/register',
      headers: {},
      data: data
    })
      .then(r => {
        if (r.status === 200) {
          return 1
        } else {
          return -1
        }
      })
      .catch(r => {
        if (r.response.status === 409) {
          return 0
        } else {
          console.log(r.message)
          return -1
        }
      })
  }

  static getUserData () {
    return axios({
      method: 'GET',
      url: configConst.serverUrl + 'user/userData/' + UserController.getUserId(),
      headers: {
        Authorization: UserController.getUserTokenHeader()
      }
    })
      .then(r => {
        if (r.status === 200) {
          return r.data
        } else if (r.status === 204) {
          return 0
        } else {
          return -1
        }
      })
      .catch(r => {
        console.log(r.message)
        return -1
      })
  }

  static changePassword (userId, actualPassword, newPassword) {
    return axios({
      method: 'POST',
      url: configConst.serverUrl + 'user/changePassword',
      headers: {
        Authorization: UserController.getUserTokenHeader()
      },
      data: {
        id_user: UserController.getUserId(),
        oldPassword: CryptoJS.MD5(actualPassword).toString(),
        newPassword: CryptoJS.MD5(newPassword).toString()
      }
    })
      .then(r => {
        if (r.status === 200) {
          return 1
        }
        return -1
      })
      .catch(r => {
        if (r.request.status === 409) {
          return 0
        }
        console.log(r.message)
        return -1
      })
  }

  static async deleteUser (password) {
    const userId = UserController.getUserId()

    return UserController.getUserData(userId).then(result => {
      return axios({
        method: 'DELETE',
        url: configConst.serverUrl + 'user/delete',
        headers: {
          Authorization: UserController.getUserTokenHeader()
        },
        data: {
          email: result.email,
          password: CryptoJS.MD5(password).toString()
        }
      })
        .then(r => {
          if (r.status === 200) {
            return 1
          } else {
            return -1
          }
        })
        .catch(r => {
          if (r.status === 409) {
            return 0
          } else {
            return -1
          }
        })
    })
  }
}
