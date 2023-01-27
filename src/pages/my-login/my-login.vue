<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login"
            @click="login"
    >一键登录
    </button>
    <view class="tips-text">登录后享受更多的权益</view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "my",
  data () {
    // 用户信息
    userInfo:{}
  },
  methods: {
    ...mapMutations('m_user', ['updateToken', 'updateUserInfo']),
    /**
     * @author topu
     * @date 2023/1/17
     * @Description 登录操作获取code
     * @param {type} [param] 参数说明
     * @return  code[string]
     */
    login () {
      // 判断用户是通过什么端登录的
      uni.getProvider({
        service: 'oauth',
        success: (res) => {
          if (~res.provider.indexOf('weixin')) {
            uni.login({
              provider: 'weixin',
              success: (loginRes) => {
                uni.getSetting({
                  success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                      // 用户已授权
                      uni.getUserInfo({
                        success: (res) => {
                          console.log(res.userInfo);
                          // 将用户的信息保存到本地
                          this.updateUserInfo(res.userInfo)
                          // 用户信息保存到本地后才获取token
                          console.log(loginRes.code)// code
                          // 将code传给后端,获取token
                          this.getToken(loginRes.code)
                          // 根据是否有token来看是否登录成功
                          if (uni.getStorageSync('Token')) {
                            uni.redirectTo({
                              url: '/pages/my/my'
                            })
                          } else {
                            uni.$showMsg('登录有误', 2000)
                          }
                        }
                      });
                    } else {
                      // 用户未授权
                      uni.authorize({
                        scope: 'scope.userInfo',
                        success () {
                          uni.getUserInfo({
                            success: (res) => {
                              console.log(res.userInfo);
                              // 将用户的信息保存到本地
                              this.updateUserInfo(res.userInfo)
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
    },
    /**
     * @author topu
     * @date 2023/1/17
     * @Description 用code向后端换取token
     * @param {string} [code] 登录信息code
     * @return 返回值
     */
    getToken (code) {
      // TODO 后端接口。向后端传递code换取token并更新进本地
      // 这里模拟向后端换取token(假token)
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2IiwiaXNzIjoiYmlhbnpoYW5nIiwiZXhwIjoxNjczOTM5Nzg0LCJpYXQiOjE2NzM5Mzg4ODR9.bLZBa6_Pm5AsNFTERnzhPOMQXZWXHQAYvZI8isW1DvE'
      this.updateToken(token)
    }
  },
  onShow () {
    if (uni.getStorageSync('Token')) {
      uni.redirectTo({
        url: '/pages/home/home'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  height: 1000rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  position: relative;
  overflow: hidden;


  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #007aff;
  }

  .tips-text {
    font-size: 12px;
    color: gray;

  }
}
</style>
