Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemstr:'',
    itemjson:'',
    itemlength:1,
  },


  showhousedetail: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/renthouse/detail/detail?packageid=' +id ,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('跳转到的查询结果')
   // let item = JSON.parse(options.str1)    
    let item = JSON.parse(options.chuancan)
    console.log(item.length)
    this.setData({
      itemstr: JSON.stringify(item, null, 2),
      itemjson:item,
      itemlength:item.length,

    })
    console.log('上个页面跳转的data-item的长度',item.length)  
    console.log('数据id:',item[0]._id)       
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