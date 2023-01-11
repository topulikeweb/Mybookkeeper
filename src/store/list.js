export default {
  namespaced: true,
  state: () => ({
    // 时间列表
    timeList: JSON.parse(uni.getStorageSync('timeList') || '[]'),
    // 消费列表
    spendList: JSON.parse(uni.getStorageSync('spendList') || '[]')
  }),
  actions: {},
  mutations: {
    setTimeList (state) {
      uni.setStorageSync('timeList', JSON.stringify(state.timeList))
    },
    setSpendList (state) {
      uni.setStorageSync('spendList', JSON.stringify(state.spendList))
    },
    updateSpendList (state, spendList) {
      state.spendList = spendList
      this.commit('m_list/setSpendList')
    }
  },
  getters: {}
}
