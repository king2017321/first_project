// pages/bbb/bbb.js
var app=getApp();

  Page({
  data: {
    userAll:[],
    weekArray: ['周日', '周一', '周二', '周三', '周四', '周五', ' 周六',],
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
  onLoad : function(e){
   
    var that = this;
    const db = wx.cloud.database();
    db.collection('user').get({
      success: res => {
        this.setData({
          userAll: res.data
        })
      }
    })  
  
  },
  
  onShow: function() {
    var that=this;
    const db = wx.cloud.database();
    db.collection('user').get({
      success: res => {
        that.setData({
          userAll: res.data
        })
      }
    })


       
   
  },
   
  UpdPart : function(e){

    wx.showModal({
      title: '注意',
      content: '确定要编辑吗？',
      success: function(sm){
        if(sm.confirm){
          console.log(e);
          wx.navigateTo({
            url: '../adminupd/adminupd?id='  +e.target.dataset.id,
            })
          
          
          
          
        }



      }
    })
    

  },
  delPart :function(e){
    var that=this;
   
    wx.showModal({
      title: '提示',
      content: '确定要删除吗?',
      success:function (sm){
        if(sm.confirm){
           const db = wx.cloud.database()
           db.collection('user').doc(e.target.dataset.id).remove({
            success: function (res) {
              wx.showToast({
                title: '删除成功',
                duration: 2000
              })
              console.log("删除成功")
              console.log(res.data)
              
              that.data.userAll.splice(e.target.dataset.index,1)
              that.setData({
                userAll:that.data.userAll
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
    addPart :function(){
      wx.navigateTo({
        url: '../add/add',
      })

      },
      seaPart:function(e){
        wx.navigateTo({
          url: '../adminsearch/adminsearch',
        })

      },
    
 
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})