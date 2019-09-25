// pages/publish_advertisement/publish_advertisement.js
wx.cloud.init({
  env: 'cloudpg-v0ty3'
})
const db=wx.cloud.database({
  env: 'cloudpg-v0ty3'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[],
    title:"",
    who:"",
    brief_description:""
  },
  input_title: function(e){
    this.setData({
      title: e.detail.value
    })
  },
  input_who: function (e) {
    this.setData({
      who: e.detail.value
    })
  },
  input_brief_description: function (e) {
    this.setData({
      brief_description: e.detail.value
    })
  },
  previewImage: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.files;

    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  chooseImage: function (){
    var that = this
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var files = that.data.files
        // 再生出一个files,避免覆盖原有files
        if(that.data.files.length>=2){
          return
        }
        for(var i =0;i<tempFilePaths.length;i++){
           files.push(tempFilePaths[i])
        }
        that.setData({
          files: files
        })
        // setData做什么用？上传的图片放到哪了  使用setData放到files中？怎么预览？预览的文件数据从哪里来 从files来
        console.log(res.tempFilePaths)

        wx.setStorage({ key: "card", data: files })
      }
    })
  },
  formSubmit: function(e){
    // var that = this
    // wx.setStorage({ key: "card", data: this.data.files})
    // var card = wx.getStorageSync('card')
    wx.cloud.uploadFile({
      cloudPath: 'test.png',
      filePath: this.data.files[0],
      success : res=>{
        // console.log(res.fileID)
        console.log(1)
      },
      fail: res=>{
        console.log(res.errMsg)
      }
    })
    console.log(this.data.files)
    // console.log(res.fileID)
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