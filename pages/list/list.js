const fetch = require('../../utils/fetch')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    category: null,
    items: [],
    pageIndex: 0,
    pageSize: 20,
    hasMore: false,
    totalCount: 0
  },
  // total count
  loadMore() {
    let {
      pageIndex,
      category
    } = this.data
    return fetch('/' + category + '/record/pages/' + ++pageIndex)
      .then(res => {
        const totalCount = parseInt(res.header['Total-Count'])
        const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
        const items = this.data.items.concat(res.data)
        this.setData({
          pageIndex,
          items,
          hasMore,
          totalCount
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      category: options.category
    })

    this.loadMore()
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
    this.setData({
      items: [],
      pageIndex: 0,
      hasMore: true
    })
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})