// pages/user/user.js
const fetch = require('../../../utils/fetch')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionList: [{
        "url": "/pages/user/mine/mine",
        "title": "我的"
      },
      {
        "url": "/xx",
        "title": "信誉中心"
      },
      {
        "url": "/pages/user/comment/comment",
        "title": "评价"
      },
    ],


    isLogin: false,
    avatarUrl: "",
    nickname: "",
  },

  /**
   * 点击登录
   */
  clickLogin(e) {
    var that = this
    if (e.detail.errMsg == "getUserInfo:ok") {
      that.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        // islogin 不应该在这
        isLogin: true
      })

      wx.login({
        success: function(res) {
          console.log(res)
          fetch('/openid', {
            code: res.code
          }).then(res => {
            console.log(res)
            app.globalData.openId = res.data.openid
          }).catch(e => {
            console.log("登录成功: ", e)
          })
        }
      })
    }

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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.chackAuth()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})