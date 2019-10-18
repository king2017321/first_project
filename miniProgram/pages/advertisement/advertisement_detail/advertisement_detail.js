// pages/advertisement_detail/advertisement_detail.js
const db = wx.cloud.database({
  env: 'cloudpg-v0ty3'
})
const local_auth = db.collection('local_auth')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    avatarUrl:"",//头像
    address: "",
    credit: "",
    gender: "",
    nickName: "",//昵称
    phone: "",
    desc: "",
    url:"../../user/other_user/other_user?id="
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid
    //console.log(options)
    db.collection("advertisement").doc(options.id).get({
      success: res => {
        this.setData({
          list: res.data,
           url: this.data.url+res.data._openid
        })
        /////
        // console.log(res.data._openid)
        openid = res.data._openid
        // console.log(openid)
//local_auth可以访问，为什么where失效？
//where没有失效，但读出来data是空的
//并不是失效。。。也不是空，只是没有存用户信息
        db.collection('local_auth').where({
          _openid: openid
        }).get({
          success:res=> {
            //console.log("获取用户信息", res.data, res.data._openid  )
            that.setData({
              avatarUrl: res.data[0].avatar_url,
              address: res.data[0].address,
              credit: res.data[0].credit,
              gender: res.data[0].gender,
              nickName: res.data[0].nick_name,
              phone: res.data[0].phone,
              desc: res.data[0].desc
            })
          },
          fail:res=>{
            console.error
            console.log("!")
          }
      }
      //////
        )
      }
    }
    )
  },

  turnto:function(e){
    wx.navigateTo({
      url:this.data.url,
    })
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

  }
})