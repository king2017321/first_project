
var app = getApp()
Page({
  //得到openid
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    this.onQuery();
  },
  turnto: function(event){
    //console.log("turn")
    var that = this
    var id = event.currentTarget.dataset['no']
    console.log(id)
    wx.navigateTo({
      url: '/pages/user/other_user/other_user?id='+id,
    //  url: '/pages/perexpo/perexpo?id=' + that.data.openId
    })

  },
  //向数据库中添加数据

  addData: function () {
    const db = wx.cloud.database()
    db.collection('baoguangdata').add({
      data: {
       // msgData: this.data.msgData,  
       msgData:this.data.inputVal
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
        })
        wx.showToast({
          title: '新增记录成功',
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
    queryResult: []
  },
  
  changeInputVal(ev) {  //这里和页面input输入框绑定了value值
     // console.log(ev)
     this.setData({
       inputVal: ev.detail.value
     })
   },
 
   onQuery: function () {
    const db = wx.cloud.database()
    // 从data集合中查询当前所有留言
    db.collection('baoguangdata').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        
        var lis = [];
        for(var i=0; i<res.data.length; i++){
          lis.push({id: res.data[i].openId,text:res.data[i].msgData});
          console.log(i);
        };
        
        this.setData({
          //queryResult: JSON.stringify(res.data, null, 2)
          queryResult: lis
        })
        console.log('[数据库] [查询记录] 成功: ', this.data.queryResult)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  
  

  addmsg() {  
    // console.log(this.data.inputVal)  拿到输入框的值 
    var list = this.data.msgData;
    //this.onQuery();
    if (this.data.inputVal != ''){
      this.addData();
    }    

    this.setData({
      //msgData: list,
      inputVal: ''
    });
    this.onQuery();
  }

})
