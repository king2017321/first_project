// pages/user_detial/user_detial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"",
    city:"",
    country:"",
    gender:0,
    language:"",
    nickName:"",
    province:""
  },

  /**
   * 载入详情
   */
  loadDetail(){
    var that = this
    wx.getUserInfo({
      success(res){
        console.log(res)
        that.setData({
          avatarUrl:res.userInfo.avatarUrl,
          city:res.userInfo.city,
          country:res.userInfo.country,
          gender:res.userInfo.gender,
          language:res.userInfo.language,
          nickName:res.userInfo.nickName,
          province:res.userInfo.province
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