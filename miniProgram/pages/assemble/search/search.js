// pages/search/search.js
var app = getApp();

// pages/search/search.js  
Page({
  data: {

  searchPart:[],


  

    centent_Show: true,
    searchValue: '',
    title:null,
    begintime: '12:01',
    endtime: '12:01',
    begindate: '2019-10-01',
    enddate: '2019-11-01',
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
      week: e.detail.value
    })
  },

  bindAimtextAreaBlur: function (e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },
  onLoad: function () {
  },

  bindTitleInput: function (e) {
    var that = this;
    that.setData({
      details: e.detail.value
    })

  },
  submitsearch:function(e){
    var that=this;
    const db=wx.cloud.database();
    db.collection('user').where({
      aim:{
        $regex:'.*'+e.detail.value.aim,
        $options:'i',
      },
      begindate:e.detail.value.begindate,
      title:{
        $regex: '.*' + e.detail.value.title,
        $options: 'i',
      }

    }).get({
      success:res=>{
        if(res.data.length==0){
          wx,wx.showToast({
            title: ' 搜索为空',
            duration: 2000,
    
          })

        }else{
          
          that.setData({
            searchPart: res.data,
          })

        }
        
      },
      fail:res=>{
        wx,wx.showToast({
          title: '搜索异常',
          duration: 2000,
       
        })

      }


    });




  },
/*
  suo: function (e) {
    var id = e.currentTarget.dataset.id
    var program_id = app.program_id;
    var that = this;

    wx.request({
      url: 'aaa.php',//这里填写后台给你的搜索接口  
      method: 'post',
      data: { str: that.data.searchValue, program_id: program_id, style: id },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.setData({
            centent_Show: false,
          });
        }
        that.setData({
          nanshen_card: res.data,
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  }
  */
}); 
