// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
  },

  /**
   * 点击登录
   */
  clickLogin(){
    var that = this
    wx.login({
      success (res) {
        if (res.code) {
          // console.log(res.code)
          wx.request({
            method: 'GET',
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
            data: {
                appid: appid,
                secret: secret,
                js_code: code,
                grant_type: 'authorization_code'
            },
            success(res) {
              that.setData({
                isLogin:true
              })
              // console.log("code:",res)
            }
          })
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /***
   * 获取code2Session
   */
  getCode2Session(appid,secret,code){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})