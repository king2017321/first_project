// pages/user_detial/user_detial.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"",
    address:"",
    desc:"",
    gender:0,
    credit:0,
    nickName:"",
    phone:""
  },


  /**
   * 载入详情
   */
  loadDetail(){
    var that = this
    // globaldata只存储简略版个人信息
    const OPENID = app.globalData.openId
    const db = wx.cloud.database()
    const local_auth = db.collection('local_auth')
    local_auth.where({
      _openid: OPENID,
    }).get({
      success(res){
        console.log(res)
        that.setData({
          avatarUrl:res.data[0].avatar_url,
          address:res.data[0].address,
          credit:res.data[0].credit,
          gender:res.data[0].gender,
          nickName:res.data[0].nick_name,
          phone:res.data[0].phone,
          desc:res.data[0].desc
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadDetail()
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