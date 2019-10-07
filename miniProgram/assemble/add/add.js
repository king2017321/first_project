// pages/ccc/ccc.js

var app = getApp().globalData;
/*添加 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    title:null,
    begintime: '12:01',
    endtime: '12:01',
    begindate: '2019-10-01',
    enddate:'2019-11-01',
    focus: false,
    week: 0,
    weekArray:  ['周日','周一', '周二', '周三', '周四', '周五', ' 周六' ],
    objectweekArray: [
     
        {
          id: 0,
          name: '周日'
        },
        {
          id: 1,
          name: '周一'
        },
        {
          id: 2,
          name: '周二'
        },
        {
          id: 3,
          name: '周三'
        },
        {
          id: 4,
          name: '周四'
        },
        {
          id: 5,
          name: '周五'
        },
        {
          id: 6,
          name: '周六'
        },
      ]
    


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


  bindBegintimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endtime:e.detail.value,
      begintime: e.detail.value
    })
  },
  bindEndtimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({

      endtime: e.detail.value
    })
  },
  bindBegindateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var begin_date = new Date(e.detail.value.replace(/-/g, "/"));

    this.setData({
      enddate: e.detail.value,
      begindate: e.detail.value,
      week: begin_date.getDay(),
    })
  },
  bindEnddateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  bindWeekChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

   /* var now = new Date();
    var now_week=now.getDay();
    var now_date=now.getDate();
    //var bein_date = new Date(this.data.begindate.replace(/-/g, "/"));
    var begin_week=e.detail.value;
    var days;
    if(now_week==0){
            days=begin_week;
    
    }else if(begin_week==0){
           days=7-now_week;
    }else {
       days=Math.abs(begin_week-now_week);
    }
    console.log(days);
    console.log(now);
    var begin_date=now.getTime()+days*1000*60**60*24;
    
   
    var result = app.util.formatTime(begin_date);
    console.log(result)
    */
    this.setData({

      week: e.detail.value,
      // begindate:begindate,
      // enddate: begindate,

    })

   
   
    
    },
  bindTitleInput:function(e){
      var that=this;
      that.setData({
        details:e.detail.value
      })

  },

  
  bindAimtextAreaBlur: function (e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },

  submitform: function (e){
  
    var that = this;

  const db=wx.cloud.database();
  db.collection('user').add({
    data :{
      title:e.detail.value.title,
      begintime:e.detail.value.begintime,
      endtime: e.detail.value.endtime,
      begindate: e.detail.value.begindate,
      enddate: e.detail.value.enddate,
      begintime: e.detail.value.begintime,
      week: e.detail.value.week,
      aim: e.detail.value.aim,
      openid:e.detail.value.openid,

    },
    
    success:res=>{
      //返回结果中包含新创建的记录的_id
      /*this.setData({
        title:e.detail.
        begintime: e.detail.value.begintime,
        endtime: e.detail.value.endtime,
        begindate: e.detail.value.begindate,
        enddate: e.detail.value.enddate,
        begintime: e.detail.value.begintime,
        week: e.detail.value.week,
        aim: e.detail.value.aim,
      })
     */
      wx.showToast({
        title:'添加成功',
        icon:'success',
        duration:2000
      })
      console.log('[数据库][新增]成功,记录_id:',res._id)
    },
   fail:res=>{
     wx.showToast({
       title: 't添加失败',
       icon: 'none',
     })
     console.log('[数据库][新增]失败:', err)
   }

  })

  },

})