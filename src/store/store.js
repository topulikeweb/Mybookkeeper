import Vue from 'vue'
import Vuex from 'vuex'
import moduleList from './list.js'
import moduleUser from './user.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    m_list: moduleList,
    m_user: moduleUser
  }
})
export default store
