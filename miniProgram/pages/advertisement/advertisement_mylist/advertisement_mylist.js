// pages/advertisement/advertisement_mylist/advertisement_mylist.js
const db = wx.cloud.database({
  env: 'cloudpg-v0ty3'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    value: "",
    hasmore: true,
    number: 0,//剩余记录条数
    skipnum: 0,//跳过条数,
    openid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //异步操作
    wx.cloud.callFunction({
      name:'getOpenId',
      success:res=>{
        that.setData({
          openid: res.result.openid
        })
        console.log(that.data.openid)
        //获取广告条数
        db.collection("advertisement")
          .where({
            _openid: that.data.openid
          })
          .count({
            success: res => {
              console.log(res.total)
              that.setData({
                number: res.total
              })
              if (number <= 0) {
                that.setData({
                  hasmore: false
                })
              }
            }
          })
          //获取广告
        db.collection("advertisement")
          .where({
            //用openid匹配
            _openid: that.data.openid
          })
          .limit(15)
          .get({
            success: res => {
              this.setData({
                list: res.data,
                skipnum: 15,
                number: this.data.number - 15
              })
            }
          })
      }
    })
  },
  edit: function (event) {
    var id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/advertisement/advertisement_edit/advertisement_edit?id=' + id,
    })
  },
  turn: function (event) {
    wx.navigateTo({
      url: '/pages/advertisement/search_advertisement/search_advertisement',
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
    var that = this
    var list = that.data.list
    if (that.data.number <= 0) {
      that.setData({
        hasmore: false
      })
      console.log(that.data.hasmore)
      wx.showToast({
        title: '没有更多了',
      })
    } else {
      db.collection("advertisement").where({
        //openid查询
      })
        .limit(15)
        .skip(that.data.skipnum)
        .get({
          success: res => {
            list.push(res.data)
            this.setData({
              list: list,
              number: this.data.number - 15,
              limit: this.data.skipnum + 15
            })
          }
        })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})