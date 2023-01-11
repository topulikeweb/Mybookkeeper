<template>
  <button type="primary" @click="login">登录</button>
</template>

<script>
export default {
  name: "my",
  methods: {
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
