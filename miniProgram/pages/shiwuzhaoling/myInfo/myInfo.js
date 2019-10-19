Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    company: [],
    swId: '',
    index: 0,
    nowlist: [],
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
    var that = this;
    var nn = this.data.now;
    wx.cloud.callFunction({
      name: 'getListsw',
      data: {},
      success: res => {
        var list = res.result.data;
        if (list == null) {
          var tosatText = '失败';
          wx.showToast({
            title: tosatText,
            icon: '',
            duration: 2000
          })
        }
        else {
          var cc = [];
          cc.push("");
          for (var i = 0; i < list.length; i++) {
            cc.push(list[i].company);
          }
          // 删了一部分（重复）
          that.setData({
            list: list,
            nowlist: list,
            company: cc
          })
        }
      }
    });
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
  look: function (e) {
    var that = this;
    var ii = e.target.dataset.swid;
    wx.setStorageSync('updateid', ii);
    wx.setStorageSync('company', e.target.dataset.company);
    wx.setStorageSync('introduce', e.target.dataset.introduce);
    wx.setStorageSync('img_path', e.target.dataset.img);
    wx.navigateTo({
      url: "../Xiangq/Xiangq",
    })
  },
  deletesw: function (e) {
    wx.cloud.callFunction({
      name: 'getOpenId',
      data: {},
      success: res => {
        if (e.target.dataset.openid == res.result.openid) {
          var that = this;
          var ii = e.target.dataset.swid;
          wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function (sm) {
              if (sm.confirm) {
                wx.cloud.callFunction({
                  name: 'deleteSw',
                  data: { swId: ii },
                  success: function (res) {
                    var toastText = "删除成功！";
                    that.data.list.splice(e.target.dataset.index, 1);
                    that.setData({
                      list: that.data.list,
                      nowlist: that.data.list
                    });
                    wx.showToast({
                      title: toastText,
                      icon: '',
                      duration: 2000
                    });
                  }
                })
              }
            }
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '您无权更改此条信息',
          })
        }
      }
    })
  },

  updatesw: function (e) {
    wx.cloud.callFunction({
      name: 'getOpenId',
      data: {},
      success: res => {
        if (e.target.dataset.openid == res.result.openid) {
          var that = this;
          var ii = e.target.dataset.swid;
          wx.setStorageSync('updateid', ii);
          wx.setStorageSync('company', e.target.dataset.company);
          wx.setStorageSync('place', e.target.dataset.place);
          wx.setStorageSync('introduce', e.target.dataset.introduce);
          wx.setStorageSync('img_path', e.target.dataset.img);
          wx.navigateTo({
            url: "../update/update",
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '您无权更改此条信息',
          })
        }
      }
    })
  },
  getnow: function (e) {
    var nn = this.data.company[e.detail.value];
    console.log(nn);
    var kk = [];
    var zz = this.data.list;
    for (var i = 0; i < zz.length; i++) {
      if (zz[i].company == nn) {
        kk.push(zz[i]);
      }
    };
    this.setData({
      nowlist: kk,
    });
    if (e.detail.value == 0) {
      this.setData({
        nowlist: this.data.list,
      });
    }
  },
  myShiwu: function () {
    wx.navigateTo({
      url: '../1/1',
    }),
      wx.cloud.callFunction({
        name: 'getOpenId',
        data: {},
        success: res => {
          var t = res.result.openid;
          var kk = [];
          var zz = this.data.list;
          for (var i = 0; i < zz.length; i++) {
            if (zz[i].openid == t) {
              kk.push(zz[i]);
            }
          };
          this.setData({
            nowlist: kk,
          });
        }
      })
  },
})