// miniprogram/pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: '',
    img: '',
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    var user = '';
    wx.getUserInfo({
      success(res){
        user = res.userInfo.nickName
      }
    });
    var that = this;
    var formData = e.detail.value;
    var now = new Date();
    var ii = wx.getStorageSync('updateid');
    var formData = e.detail.value;
    var cp;
    wx.cloud.callFunction({
      name:'getOpenId',
      data:{},
      success: res => {
        this.setData({
          openid:res.result.openid
        })
        cp = formData.company + formData.introduce + this.data.openid + '.png';
        if (formData.company == "" || formData.introduce == "") {
          wx.showModal({
            title: '提示',
            content: '信息填写不完整',
          });
        }
        else {
          if (that.data.img != '') {
            wx.cloud.uploadFile({
              cloudPath: cp,
              filePath: that.data.img,
              success: res => {
                that.setData({
                  img_url: res.fileID,
                });
                wx.cloud.callFunction({
                  name: 'addNeitui',
                  data: {
                    company: formData.company,
                    introduce: formData.introduce,
                    img_path: this.data.img_url,
                    openid: this.data.openid,
                    user: user
                  },
                  success: function (res) {
                    wx.navigateTo({
                      url: '../daf/daf',
                    })
                  }
                });
              }
            });
          }
          else {
            wx.cloud.callFunction({
              name: 'addNeitui',
              data: {
                company: formData.company,
                introduce: formData.introduce,
                img_path: '',
                openid: this.data.openid
              },
              success: function (res) {
                wx.navigateTo({
                  url: '../daf/daf',
                })
              }
            });
          };
        }
      }
    });
  },

  addimg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths[0]);
        that.setData({
          img: tempFilePaths[0]
        });
      }
    });
  },

  delimg: function () {
    this.setData({
      img: '',
    })
  }
})