// pages/adminupd/adminupd.js
var app = getApp();
/**
 * 生命周期函数--监听页面加载
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    begintime: null,
    endtime: null,
    begindate: null,
    enddate: null,
    aim: null,
    focus: false,
    week: 0,
    weekArray: ['周日', '周一', '周二', '周三', '周四', '周五', ' 周六'],
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


    var that = this;
    var id = options.id;
    app.requestDetailid = id;
    console.log(id);
    const db = wx.cloud.database();
    console.log(dbdata);
    var dbdata = db.collection('user').doc(id).get({
      success: res => {
        console.log(res.data);
        that.setData({
          title: res.data.title,
          begintime: res.data.begintime,
          endtime: res.data.endtime,
          begindate: res.data.begindate,
          enddate: res.data.enddate,
          focus: false,
          week: res.data.week,
          aim: res.data.aim,



        })
      }


    });

    //console.log(dbdata.begindate);


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
    this.setData({
      begindate: e.detail.value
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
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindTitleInput: function (e) {
    var that = this;
    that.setData({
      details: e.detail.value
    })

  },

  bindAimtextAreaBlur: function (e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },
  submitform: function (e) {
    const db = wx.cloud.database();
    console.log(app.requestDetailid);
    db.collection('user').doc(app.requestDetailid).update({
      data: {
        title: e.detail.value.title,
        begintime: e.detail.value.begintime,
        endtime: e.detail.value.endtime,
        begindate: e.detail.value.begindate,
        enddate: e.detail.value.enddate,
        begintime: e.detail.value.begintime,
        week: e.detail.value.week,
        aim: e.detail.value.aim,

      },
      success: res => {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
        })
        console.log("数据库更新成功")

      },
      fail: res => {
        wx.showToast({
          title: '修改失败',
          icon: 'fail',
        })
        console.log("数据库更新失败")
      },

    })

  },

  /*
    submitform: function (e) {
      const db = wx.cloud.database();
      db.collection('user').add({
        data: {
          begintime: e.detail.value.begintime,
          endtime: e.detail.value.endtime,
          begindate: e.detail.value.begindate,
          enddate: e.detail.value.enddate,
          begintime: e.detail.value.begintime,
          week: e.detail.value.week,
          aim: e.detail.value.aim,
  
        },
  
        success: res => {
          //返回结果中包含新创建的记录的_id
          this.setData({
            begintime: e.detail.value.begintime,
            endtime: e.detail.value.endtime,
            begindate: e.detail.value.begindate,
            enddate: e.detail.value.enddate,
            begintime: e.detail.value.begintime,
            week: e.detail.value.week,
            aim: e.detail.value.aim,
          })
  
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          console.log('[数据库][新增]成功,记录_id:', res._id)
        },
        fail: res => {
          wx.showToast({
            title: 't添加失败',
            icon: 'none',
          })
          console.log('[数据库][新增]失败:', err)
        }
  
      })
  
    },
  
  */

})
