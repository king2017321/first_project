//app.js
App({
  //const cloud = require('wx-server-sdk'),
  config: {
    apiBase: 'http://localhost:8088'
  },
// // <<<<<<< Updated upstream:app.js
//   onLaunch: function() {
//     // 展示本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)
//     wx.cloud.init({
//       env :'cloudpg-v0ty3',
      
//     })
//   }
// // =======
// // >>>>>>> Stashed changes:mimiProgram/app.js

  /**
   * 查看是否已经授权
   */
  chackAuth(){
    var that = this
    wx.getSetting({
      success(res){
        // 查看是否授权
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success(res){
              that.globalData.avatarUrl = res.userInfo.avatarUrl,
              that.globalData.nickName=res.userInfo.nickName,
              that.globalData.isLogin=true
            }
          })
        }
      }
    })
  },

  onLaunch: function() {
    wx.cloud.init({
      env:'cloudpg-v0ty3',
      traceuser: true
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 授权？获取数据：什么都不干
    this.chackAuth() 
    
  },
  globalData: {
    isLogin: false,
    avatarUrl:"",
    nickName:"",
  }
})