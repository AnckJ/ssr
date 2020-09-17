const state = {
  user: {
    name: '小明',
    age: 18,
    sex: 'male'
  }
}

const mutations = {
  'SET_USER'(state, user) {
    state.user = user
  }
}

const getters = {
  user: state => state.user
}

const actions = {}

export default {
  state,
  mutations,
  getters,
  actions
}
