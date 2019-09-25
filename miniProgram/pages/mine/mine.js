// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tradeList:[]
  },

  /**
   * 获取所有记录
   */
  getTradeList(){
    var that = this
    wx.request({
      url:"http://localhost:8080/user/info/trade_list",
      success(res){
        console.log(res)
        that.setData({
          tradeList:res.data
        })
      }
    })
  },

  /*
  *点击删除
  */
  deleteItem(e){
    var that = this
    var id = e.currentTarget.id
    console.log(e)
    console.log(id)
    wx.request({
      url: 'http://localhost:8080/user/info/delete_trade_with_id?id='+id,
      success(res){
        console.log(res)
        that.setData({
          tradeList:res.data
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTradeList()
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
    var that = this
    wx.request({
      url:"http://localhost:8080/user/info/trade_with?tuser=ring",
      success(res){
      }
    })
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