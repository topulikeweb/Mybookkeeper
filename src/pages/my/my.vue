<template>
  <view class="container">
    <!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <view class="nickname">{{ userinfo.nickName }}</view>
    </view>

    <uni-list style="margin-top: 20rpx">
      <uni-list-item title="预购清单"
                     :show-badge="true" badge-text="12"></uni-list-item>
      <uni-list-item title="列表右侧显示角标"
                     :show-badge="true"></uni-list-item>
      <uni-list-item title="分享给朋友"
                     :show-badge="true"></uni-list-item>
      <uni-list-item title="列表右侧显示角标"
                     :show-badge="true"></uni-list-item>
    </uni-list>
  </view>
</template>

<script>


import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      isShow: true
    }
  },
  computed: {
    ...mapState('m_user', ['userinfo'])
  },
  methods: {
    ...mapMutations('m_user', ['tokenLister'])
  },
  onShow () {
    this.tokenLister()
  }
}
</script>

<style scoped lang="scss">
.container {
  background-color: silver;

  .top-box {
    height: 360rpx;
    background-color: #007aff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid white;
      box-shadow: 0 1px 5px black;
    }

    .nickname {
      color: white;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
  }
}
</style>
