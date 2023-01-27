<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" @click="login"
    >一键登录
    </button>
    <view class="tips-text">登录后享受更多的权益</view>
  </view>
</template>

<script>
export default {
  name: "my",
  methods: {
    /**
     * @author topu
     * @date 2023/1/17
     * @Description 登录
     * @param {type} [param] 参数说明
     * @return 返回值
     */
    login () {
      // 判断用户是通过什么端登录的
      uni.getProvider({
        service: 'oauth',
        success: function (res) {
          if (~res.provider.indexOf('weixin')) {
            uni.login({
              provider: 'weixin',
              success: function (loginRes) {
                console.log(loginRes.code);// code
                uni.getSetting({
                  success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                      // 用户已授权
                      uni.getUserInfo({
                        success: function (res) {
                          console.log(res.userInfo);
                        }
                      });
                    } else {
                      // 用户未授权
                      uni.authorize({
                        scope: 'scope.userInfo',
                        success () {
                          uni.getUserInfo({
                            success: function (res) {
                              console.log(res.userInfo);
                            }
                          });
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
