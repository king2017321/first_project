Page({
  data: {
    date: "Oct 8 2019",
    toux: "/swImg/9.jpg",
    neituiId: '',
    place:'',
    company: '',
    introduce: '',
    img_url: '',
    img: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var ii = wx.getStorageSync('swid');
    var place = wx.getStorageSync('place');
    var company = wx.getStorageSync('company');
    var introduce = wx.getStorageSync('introduce');
    var img_path = wx.getStorageSync('img_path');
    wx.cloud.downloadFile({
      fileID: img_path,
      success: res => {
        // get temp file path
        that.setData({
          img: res.tempFilePath,
        });
      },
      fail: err => {
        // handle error
      }
    });
    this.setData({
      swId: ii,
      company: company,
      introduce: introduce,
      img_url: img_path,
      place:place
    })
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
