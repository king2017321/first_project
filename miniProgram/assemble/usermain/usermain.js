// pages/assemble/usermain/usermain.js
var app = getApp();

Page({
  data: {
    userAll: [],
    weekArray: ['周日', '周一', '周二', '周三', '周四', '周五', ' 周六',],
    objectweekArray: [
      {
        id: 0,
        name: '周日'
      },
      {
        id: 1,
        name: '周一'
      },
      {
        id: 2,
        name: '周二'
      },
      {
        id: 3,
        name: '周三'
      },
      {
        id: 4,
        name: '周四'
      },
      {
        id: 5,
        name: '周五'
      },
      {
        id: 6,
        name: '周六'
      },

    ]

  },
  onLoad: function (e) {

    var that = this;
    const db = wx.cloud.database();
    db.collection('user').get({
      success: res => {
        this.setData({
          userAll: res.data
        })
      }
    })


  },

  onShow: function () {
    var that = this;
    const db = wx.cloud.database();
    db.collection('user').get({
      success: res => {
        that.setData({
          userAll: res.data
        })
      }
    })




    /*
    db.collection('user').get({
     success: res=>{
       console.log("dddd",res.data);
     },
     fail: res =>{
       console.error('获取用户失败',res);
     },
     complete :res=>{
       console.log("获取用户执行操作完成",res);
     }
    })*/

  },
  addPart: function () {
    wx.navigateTo({
      url: '../add/add',
    })

  },
  seaPart: function (e) {
    wx.navigateTo({
      url: '../usersearch/usersearch',
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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