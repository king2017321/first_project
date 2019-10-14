//app.js

App({
  //const cloud = require('wx-server-sdk')
  config: {
    apiBase: 'http://47.112.27.55:8088'
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
    // 业务逻辑改动 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const db = wx.cloud.database()
    const local_auth = db.collection('local_auth')
    // 用云函数的方法吧openid获取下来
    var openId
    wx.cloud.callFunction({
      name: 'getOpenId',
      success(res){
        openId = res.result.openid
      }
    })
    
    wx.getSetting({
      success(res) {
        // 查看是否授权
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              that.globalData.avatarUrl = res.userInfo.avatarUrl,
                that.globalData.nickName = res.userInfo.nickName,
                that.globalData.isLogin = true
                // 可云开发获取也可后端获取。这里在签，可以被后端获取的覆盖掉，无影响
                that.globalData.openId = openId
            }
          })

          wx.login({
            success: function (res) {
              wx.showLoading({ title: 'Loading...' })
              wx.request({
                url: 'http://47.112.27.55:8088/openid',
                data: {
                  code: res.code
                },
                method: 'GET',
                dataType: 'json',
                success: function (res) {
                  console.log(res)
                  that.globalData.openId = res.data.openid
                },
                complete: wx.hideLoading
              })
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
    
  }
})