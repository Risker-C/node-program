import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    login (state, data) {
      state.userInfo = data
    },
    logout (state) {
      setTimeout(() => {
        state.userInfo = {}
      }, 1000)
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => localStorage.getItem(key),
        setItem: (key, value) =>
          localStorage.setItem(key, value),
        removeItem: key => localStorage.removeItem(key)
      }
    })
  ]
})

export default store
