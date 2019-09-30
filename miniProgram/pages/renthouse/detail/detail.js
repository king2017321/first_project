Page({

  data: {
    isid:'',
    detail:'',
    picpaths:[],
    picnum:0
  },

  onLoad: function (options) {
  
    // let item = JSON.parse(options.str1)    
    console.log('传来的数据',options.packageid);  
    this.setData({
      isid:options.packageid
    })
    const db = wx.cloud.database()
    db.collection('house').where({
      _id: this.data.isid
    }).get({
      success: res => {
        let el = JSON.stringify(res.data, null, 2)
        let item = JSON.parse(el)
      
        this.setData({
          detail: JSON.stringify(res.data, null, 2),
          detailjson:item
        })
        console.log('[数据库] [查询记录] 成功: ', res)
        console.log('已加载进入data',this.data.detail)
        console.log('检测json对象',this.data.detailjson[0])
        console.log('检测json对象key:value调用', this.data.detailjson[0].area)
      }
    })
  }

})