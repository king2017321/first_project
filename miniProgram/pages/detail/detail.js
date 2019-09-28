const fetch = require('../../utils/fetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    good: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    fetch(`/buy/record/${options.id}`)
      .then(res => {
        this.setData({ good: res.data })
        wx.setNavigationBarTitle({ title: res.data.title })
      })
  },

  previewHandle (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.shop.images
    })
  }
})
