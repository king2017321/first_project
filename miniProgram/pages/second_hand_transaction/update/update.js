// pages/sell/sell.js
const fetch = require('../../../utils/fetch')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    good: {}
  },

  chooseImage: function(e) {
    var that = this;
    console.log(this.data.files.length);
    if (this.data.files.length >= 5) {
      wx.showModal({
        title: '提示',
        content: '最多只能添加五张图片',
        showCancel: false
      })
      return
    }
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (res.tempFilePaths.length > 5 - that.data.files.length) {
          wx.showToast({
            title: '超出限制图片数量', //提示文字
            duration: 2000, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none', //图标，支持"success"、"loading"  
          })
          return
        }
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
    // e.detail.value['images']=[]
    // var FSM = wx.getFileSystemManager();
    // var files = this.data.files;
    // for (let r in files) {
    //   console.log(files[r])
    //   var spilts = r.split('.')
    //   var type = spilts[spilts.length-1]
    //   FSM.readFile({
    //     filePath: files[r],
    //     encoding: "base64",
    //     success: function(res) {
    //       console.log('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
    //       e.detail.value['images'].concat('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
    //     }
    //   });
    // }

    e.detail.value['id'] = this.data.good.id
    e.detail.value['images'] = this.data.files
    e.detail.value['user_id'] = app.globalData.openId
    console.log('Update 更新：', e.detail.value)
    fetch("/record/update", e.detail.value, "POST").then(res => wx.showToast({
      title: '上传成功', //提示文字
      duration: 2000, //显示时长
      mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
      icon: 'success', //图标，支持"success"、"loading"  
    })).then(res => wx.redirectTo({
      url: '/pages/second_hand_transaction/index/index?active=1'
    }))

  },

  deleteRecord: function() {
    fetch(`/record/${this.data.good.id}`, {}, 'DELETE')
      .then(res => wx.showToast({
        title: '删除成功', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'success', //图标，支持"success"、"loading"  
      })).then(res => wx.redirectTo({
        url: '/pages/second_hand_transaction/index/index?active=1'
      }))
  },

  onLoad: function(options) {
    fetch(`/record/${options.id}`)
      .then(res => {
        this.setData({
          good: res.data,
          files: res.data.images
        })
      })
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