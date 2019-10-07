


var app = getApp();

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

  UpdPart: function (e) {

    wx.showModal({
      title: '注意',
      content: '确定要编辑吗？',
      success: function (sm) {
        if (sm.confirm) {
          console.log(e);
          wx.navigateTo({
            url: '../adminupd/adminupd?id=' + e.target.dataset.id,
          })




        }



      }
    })


  },
  delPart: function (e) {
    var that = this;

    wx.showModal({
      title: '提示',
      content: '确定要删除吗?',
      success: function (sm) {
        if (sm.confirm) {
          const db = wx.cloud.database()
          db.collection('user').doc(e.target.dataset.id).remove({
            success: function (res) {
              wx.showToast({
                title: '删除成功',
                duration: 2000
              })
              console.log("删除成功")
              console.log(res.data)

              that.data.searchPart.splice(e.target.dataset.index, 1)
              that.setData({
                searchPart: that.data.searchPart
              })

            },
            fail: function (res) {
              wx.showToast({
                title: "删除失败",
                duration: 2000
              })
            }
          })


        }
      }
    })


  },

}); 
