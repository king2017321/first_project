const fetch = require('../../../utils/fetch')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    recordBuy: [],
    recordSell: [],
    pageIndex: 0,
    pageSize: 20,
    hasMore: false,
    totalCount: 0,
    active: 0
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


    e.detail.value['images'] = this.data.files
    e.detail.value['user_id'] = app.globalData.openId
    console.log('POST 上传：', e.detail.value)
    fetch("/record/add", e.detail.value, "POST").then(res => wx.showToast({
      title: '上传成功', //提示文字
      duration: 2000, //显示时长
      mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
      icon: 'success', //图标，支持"success"、"loading"  
    })).then(res => wx.redirectTo({
      url: '/pages/second_hand_transaction/index/index?active=1'
    }))
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
        console.log("Total-Count", totalCount)
        const hasMore = pageIndex * this.data.pageSize < totalCount
        console.log("hasMore", hasMore)
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
      this.loadSearch(inputVal)
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
  onLoad: function(options) {
    this.setData({
      active: options.active
    })
    this.loadMore()
  },

  onPullDownRefresh: function() {
    if (this.data.active == 2) {
      wx.stopPullDownRefresh()
      return
    }

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
    if (this.data.active == 0 && this.data.hasMore) {
      this.loadMore()
    }
  }
})