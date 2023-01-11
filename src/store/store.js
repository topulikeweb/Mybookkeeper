import Vue from 'vue'
import Vuex from 'vuex'
import moduleList from './list.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    m_list: moduleList
  }
})
export default store
