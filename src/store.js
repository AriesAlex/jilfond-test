import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    users: [],
    loading: false,
    error: null,
    selectedUser: null,
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_USERS(state, users) {
      state.users = users

      if (!users.find(u => u.id == state.selectedUser?.id)) {
        state.selectedUser = null
      }
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_SELECTED_USER(state, user) {
      state.selectedUser = user
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
  },
  actions: {
    async fetchUsers({ commit }, query) {
      query = query.trim()
      if (!query) {
        commit('SET_USERS', [])
        return
      }
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      try {
        const queries = query
          .replaceAll(', ', ',')
          .split(',')
          .map(q => q.trim())
          .filter(Boolean)

        const fetchPromises = queries.map(q => {
          const type = isNaN(q) ? 'username' : 'id'
          return axios.get(
            `https://jsonplaceholder.typicode.com/users?${type}=${q}`
          )
        })

        const responses = await Promise.all(fetchPromises)
        const allUsers = responses.flatMap(response => response.data)

        const uniqueUsersMap = allUsers.reduce((acc, user) => {
          acc[user.id] = user
          return acc
        }, {})

        const uniqueUsers = Object.values(uniqueUsersMap)

        commit('SET_USERS', uniqueUsers)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    selectUser(state, user) {
      if (user.id == state.getters.selectedUser?.id) {
        state.commit('SET_SELECTED_USER', null)
        return
      }
      state.commit('SET_SELECTED_USER', user)
    },
  },
  getters: {
    users: state => state.users,
    isLoading: state => state.loading,
    error: state => state.error,
    selectedUser: state => state.selectedUser,
  },
})
