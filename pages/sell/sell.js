// pages/sell/sell.js
const fetch = require('../../utils/fetch')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    uploadData: {
      briefDescription: "上传测试",
      images: ["http://tmp/wx231588dfe04046ab.o6zAJs-5lk4LLf4Yasjnd9YYXgMU.7UoFRgaNsieA4c8076b1f61c1dae29cc2bb9da8c2aa7.jpg", "http://tmp/wx231588dfe04046ab.o6zAJs-5lk4LLf4Yasjnd9YYXgMU.7UoFRgaNsieA4c8076b1f61c1dae29cc2bb9da8c2aa7.jpg", "http://tmp/wx231588dfe04046ab.o6zAJs-5lk4LLf4Yasjnd9YYXgMU.7UoFRgaNsieA4c8076b1f61c1dae29cc2bb9da8c2aa7.jpg"],
      phone: "13087228384",
      price: 11.12,
      qq: "13087228384",
      title: "标题",
      wx: "13087228384",
      userId: 123
    }
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths)
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files, // 需要预览的图片http链接列表
    })
    console.log(this.data.files)
  },

  formSubmit: function(e) {
    e.detail.value['images'] = this.data.files
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //fetch("/buy/record/add", e.detail.value, "POST").then(res => console.log(res.data))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    fetch("/buy/record/add", this.data.uploadData, "POST").then(res => console.log(res.data))
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