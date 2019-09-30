//app.js

App({
  //const cloud = require('wx-server-sdk')
  config: {
    apiBase: 'http://localhost:8088'
  },

  globalData: {
    isLogin: false,
    avatarUrl: "",
    nickName: "",
    openId: ''
  },

  /**
   * 查看是否已经授权
   */
  chackAuth() {
    var that = this
    wx.getSetting({
      success(res) {
        // 查看是否授权
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              that.globalData.avatarUrl = res.userInfo.avatarUrl,
                that.globalData.nickName = res.userInfo.nickName,
                that.globalData.isLogin = true
            }
          })
        }
      }
    })
  },

  onLaunch: function() {
    wx.cloud.init({
      env: 'cloudpg-v0ty3',
      traceuser: true
    })

    // 授权？获取数据：什么都不干
    // 如果已经授权，说明用户已经同意获取信息，就把当前用户信息存到全局的文件里，方便以后调用
    this.chackAuth()

  },
})