const fetch = require('../../../utils/fetch')
const app = getApp()

// pages/trade/trade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordBuy: [],
    recordSell: [],
    pageIndex: 0,
    pageSize: 20,
    hasMore: true,
    search: false,
    totalCount: 0,
    active: 0
  },



  // /record/sell/{openid}
  loadSell: function() {
    return fetch('/record/sell/' + app.globalData.openId)
      .then(res => {
        const recordSell = this.data.recordSell.concat(res.data)
        this.setData({
          recordSell
        })
      })
  },

  // /record/page/{id}
  loadBuy: function() {
    let pageIndex = this.data.pageIndex
    return fetch('/record/page/' + pageIndex++)
      .then(res => {
        const totalCount = parseInt(res.header['Total-Count'])
        const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
        const recordBuy = this.data.recordBuy.concat(res.data)
        this.setData({
          totalCount,
          hasMore,
          pageIndex,
          recordBuy
        })
      })
  },

  // /record/search/{param}
  loadSearch: function(param) {
    return fetch('/record/search/' + param).then(res => {
      this.setData({
        recordBuy: res.data,
        hasMore: false
      })
    })
  },

  loadMore: function() {
    let active = this.data.active
    if (active == 0)
      return this.loadBuy()
    else if (active == 1)
      return this.loadSell()
  },

  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imglist // 需要预览的图片http链接列表  
    })
  },

  onChange: function(e) {
    this.setData({
      active: e.detail.index
    })
    if (this.data.active == 0) {
      if (this.data.recordBuy == false) {
        this.loadMore()
      }
    } else if (this.data.active == 1) {
      if (this.data.recordSell == false) {
        this.loadMore()
      }
    }
  },

  onSearch: function(e) {
    var inputVal = e.detail
    if (inputVal != "")
      this.loadMore(inputVal)
  },

  onCancel: function() {
    this.setData({
      record: [],
      pageIndex: 0,
      hasMore: true
    })
    this.loadSell()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.loadMore()
  },

  onPullDownRefresh: function() {
    if (this.data.active == 0) {
      this.setData({
        recordBuy: [],
        pageIndex: 0,
        hasMore: true
      })
    } else if (this.data.active == 1) {
      this.setData({
        recordSell: []
      })
    }
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },

  onReachBottom: function() {
    if (this.data.active == 0) {
      this.loadMore()
    }
  }
})