export default {
  namespaced: true,
  state: {
    token: uni.getStorageSync('Token'),
    userinfo: uni.getStorageSync('userInfo' || '{}')
  },
  action: {},
  mutations: {
    setTokenToStorage (state) {
      uni.setStorageSync('Token', JSON.stringify(state.token))
    },
    setUserInfoToStorage (state) {
      uni.setStorageSync('userInfo', state.userinfo)
    },
    /**
     * @author topu
     * @date 2023/1/17
     * @Description  更新本地储存的token
     * @param {string} [token] 后端换取的token
     * @return 返回值
     */
    updateToken (state, token) {
      state.token = token
      this.commit('m_user/setTokenToStorage')
    },
    /**
     * @author topu
     * @date 2023/1/17
     * @Description 更新本地储存的userinfo
     * @param {object} [userinfo] 参数说明
     * @return 返回值
     */
    updateUserInfo (state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/setUserInfoToStorage')
    },
    // 监听token是否存在
    tokenLister () {
      if (!uni.getStorageSync('Token')) {
        uni.redirectTo({
          url: '/pages/my-login/my-login'
        })
      }
    }
  },
  getters: {}
}
