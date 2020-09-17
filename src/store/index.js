import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = []
files.keys().forEach(key => {
  modules.push(files(key).default)
})

export default () => {
  return new Vuex.Store({
    modules
  })
}