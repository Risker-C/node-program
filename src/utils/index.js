import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import store from '../store'
const baseURL = '/admin'

const Instance = axios.create({
  baseURL,
  timeout: 15000
})

class getDate {
  static get (url, data, config) {
    return new Promise((resolve, reject) => {
      Instance.get(url, {params: data}, config).then(res => {
        if (res.data.code === 403) {
          Message.warning('登录状态失效，请重新登录')
          store.commit('login')
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        } else {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  static fetch (url, data, config, methods) {
    return new Promise((resolve, reject) => {
      Instance[methods](url, data, config).then(res => {
        if (res.data.code === 403) {
          Message.warning('登录状态失效，请重新登录')
          store.commit('login')
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        } else {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  static post (url, data, config) {
    return this.fetch(url, data, config, 'post')
  }
  static put (url, data, config) {
    return this.fetch(url, data, config, 'put')
  }
  static patch (url, data, config) {
    return this.fetch(url, data, config, 'patch')
  }
}

export { getDate }
