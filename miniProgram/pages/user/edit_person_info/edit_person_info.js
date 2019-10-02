// pages/user/edit_person_info/edit_person_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    // 不变的，但要一起提交
    avatarUrl:"",
    credit:"",
    // ^^^^^
    address:"",
    desc:"",
    gender:0,
    nickName:"",
    phone:""
  },
  /**
   * 载入详情
   */
  loadDetail(){
    var that = this
    const db = wx.cloud.database()
    const local_auth = db.collection('local_auth')
    const openId = wx.cloud.callFunction({
      name: 'getOpenId',
    })
    local_auth.where({"_openid":openId}).get({
      success(res){
        console.log("获取",res)
        that.setData({
          id:res.data[0]._id,
          avatarUrl:res.data[0].avatar_url,
          credit:res.data[0].credit,
          address:res.data[0].address,
          gender:res.data[0].gender,
          nickName:res.data[0].nick_name,
          phone:res.data[0].phone,
          desc:res.data[0].desc
        })
      }
    })
  },
  /**
   * 获取input修改值
   */
  bindHideNickname(e){
    var nick_name = e.detail.value
    this.setData({
      nickName : nick_name
    })
  },
  bindHideGender(e){
    var gender = e.detail.value
    if(gender=="男"){
      gender = 1
    }else if(gender=="女"){
      gender = 2
    }
    this.setData({
      gender : gender
    })
  },
  bindHideAddress(e){
    var address = e.detail.value
    this.setData({
      address : address
    })
  },
  bindHidePhone(e){
    var phone = e.detail.value
    this.setData({
      phone : phone
    })
  },
  bindHideDesc(e){
    var desc = e.detail.value
    this.setData({
      desc : desc
    })
  },
  /**
   * 保存修改
   */
  handleSumit(){
    var that = this
    const db = wx.cloud.database()
    const local_auth = db.collection('local_auth')
    // const openId = wx.cloud.callFunction({
    //   name: 'getOpenId',
    // })

    local_auth.doc(that.data.id).set({
      data:{
        avatar_url:that.data.avatarUrl,
        credit:that.data.credit,
        address:that.data.address,
        desc:that.data.desc,
        gender:that.data.gender,
        nick_name:that.data.nickName,
        phone:that.data.phone
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载当前个人信息
    this.loadDetail()
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