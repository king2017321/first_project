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
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:ok") {
      // 同意的话就是愿意公开信息，那么久直接存到数据库，一遍发布模块可以快速填充,也是编辑个人信息可行(保存到数据库才能保存更改的内容)
      const db = wx.cloud.database()
      const local_auth = db.collection('local_auth')
      local_auth.add({
        data:{
          address:e.detail.userInfo.country+","+e.detail.userInfo.province+","+e.detail.city,
          avatar_url:e.detail.userInfo.avatarUrl,
          credit:0,
          desc:"",
          gender:e.detail.userInfo.gender,
          nick_name:e.detail.userInfo.nickName,
          phone:""
        },
        success(res) {

          console.log("add_info",res)
        }
      })
      // 精简版用来填充简介页面
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        // islogin 不应该在这
        isLogin: true
      })

      
    }

  },

  /**
   * 查看是否已经授权
   */
  chackAuth() {
    this.setData({
      avatarUrl: app.globalData.avatarUrl,
      nickName: app.globalData.nickName, 
      isLogin: app.globalData.isLogin
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