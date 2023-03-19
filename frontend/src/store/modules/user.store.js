import { userService } from '../../services/user.service.js'

export const userStore = {
  state() {
    return {
      user: userService.getLoggedinUser(),
    }
  },
  mutations: {
    onChangeLoginStatus(state, { user }) {
      state.user = user
    },
    logoutUser(state) {
      console.log('state.user', state.user)
      state.user = null
    },
  },
  getters: {
    getLoggedInUser({ user }) {
      return user
    },
  },
  actions: {
    logoutUser({ commit }) {
      userService.logout().then(() => {
        commit({ type: 'logoutUser' })
      })
    },
  },
}
