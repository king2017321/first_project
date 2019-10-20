
var app = getApp()
Page({
  //得到openid
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    //this.onQuery();
    var that = this
    that.setData({
      openId:options.id
    })
    console.log(this.data.openId)
    console.log(options)
  },
  //向数据库中添加数据

  addData: function () {
    const db = wx.cloud.database()
    db.collection('baoguangdata').add({
      data: {
        // msgData: this.data.msgData,  
        msgData: this.data.inputVal,
        openId:this.data.openId
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
        })
        wx.showToast({
          title: '曝光成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },


  data: {
    inputVal: '',
    msgData: [],
    queryResult: [],
    openId:''
  },

  changeInputVal(ev) {  //这里和页面input输入框绑定了value值
    // console.log(ev)
    this.setData({
      inputVal: ev.detail.value
    })
  },

  

  addmsg() {
    // console.log(this.data.inputVal)  拿到输入框的值 
    var list = this.data.msgData;
    //this.onQuery();
    if (this.data.inputVal != '') {
      this.addData();
    }

    this.setData({
      //msgData: list,
      inputVal: ''
    });
    
  }

})
