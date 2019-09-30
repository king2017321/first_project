// pages/databaseGuide/databaseGuide.js
const app = getApp()
Page({

  data: {
    areas: [
      { name: 'areaA', value: 'A区' },
      { name: 'areaB', value: 'B区' },
      { name: 'areac', value: 'C区' },
      { name: 'areaD', value: 'D区' },
      { name: 'areaE', value: 'E区' },
    ],
    rooms: [
      { name: 'big', value: '主卧' },
      { name: 'mid', value: '侧卧' },
      { name: 'small', value: '小卧' },
    ],
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
    searcharea:'',
    searchroom:'',
    qarea:'areaB',
    qroom:'侧卧',
    bigImg:'',
    idss:''
  },
  areaset: function (e) {
    console.log('area发生set事件，携带value值为：', e.detail.value)
    this.data.searcharea = e.detail.value
  },
  roomset: function (e) {
    console.log('room发生set事件，携带value值为：', e.detail.value)
    this.data.searchroom = e.detail.value
  },
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
   // console.log('全局数据id'+app.globalData.openid)
  },

  onQuery: function () {
    const db = wx.cloud.database()
    db.collection('house').where({
      roomtype:this.data.searchroom,
      areatype:this.data.searcharea
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data,null,2),
        })
        
        console.log('[数据库] [查询记录] 成功res: ', res)
        console.log('数据条目：',res.data.length)
        
        let str1=this.data.queryResult
        wx.navigateTo({
          url: '/pages/renthouse/chaxunye/chaxunye?chuancan='+str1,
        })

      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }
  
})