// miniprogram/pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swId: '',
    company: '',
    place:'',
    introduce: '',
    img_url: '',
    img: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var ii = wx.getStorageSync('updateid');
    var company = wx.getStorageSync('company');
    var place = wx.getStorageSync('place');
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
      place:place,
      introduce: introduce,
      img_url: img_path
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

  },

  formSubmit: function (e) {
    var that = this;
    var ii = wx.getStorageSync('updateid');
    var formData = e.detail.value;
    var cp = formData.company + formData.introduce + formData.place + ii +'.png';
    wx.cloud.deleteFile({
      fileList: [this.data.img_url],
      success: res => {
        // handle success
      },
      fail: err => {
        // handle error
      }
    });
    if (this.data.img == '') {
      this.setData({
        img_url: ''
      });
      wx.navigateTo({
        url: '../104/104',
      })
    };
    if (this.data.img != '') {
      wx.cloud.uploadFile({
        cloudPath: cp,
        filePath: that.data.img,
        success: res => {
          // get resource ID
          that.setData({
            img_url: res.fileID,
          })
          wx.cloud.callFunction({
            name: 'updateSw',
            data: {
              swId: ii,
              company: formData.company,
              place: formData.place,
              introduce: formData.introduce,
              img_path: this.data.img_url
            },
            success: function (res) {
              wx.navigateTo({
                url: '../104/104',
              })
            }
          })
        },
        fail: err => {
          // handle error
        }
      })
    }
  },

  addimg: function () {
    var that = this;
    var img = '';
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        img = tempFilePaths[0];
        console.log(img);
        that.setData({
          img: img,
        })
      }
    });
  },

  delimg: function () {
    this.setData({
      img: '',
    })
  }
})