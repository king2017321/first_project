var openId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:"",
    navList:["动态","评价"],
    currentIndex:0,
    avatarUrl:"",
    address:"",
    credit:"",
    gender:"",
    nickName:"",
    phone:"",
    desc:"",
    mineList:[],
    commentList:[],
  },

  //点击曝光
  onExporsure(){
    wx.navigateTo({
      url: '/pages/exposure/index/index',
    })
  },

  // 点击导航
  activeNav(e){
    this.setData({
      currentIndex: e.target.dataset.index
    })
  },
  /**
   * 载入数据
   * 使用传入的openid作为索引，查找local_auth数据库
   */
  loadUserInfo(){
    var that = this
    const db = wx.cloud.database()
    const local_auth = db.collection('local_auth')
    local_auth.where({
      _openid: openId,
    }).get({
      success(res){
        console.log("获取用户信息",res,openId)
        that.setData({
          avatarUrl:res.data[0].avatar_url,
          address:res.data[0].address,
          credit:res.data[0].credit,
          gender:res.data[0].gender,
          nickName:res.data[0].nick_name,
          phone:res.data[0].phone,
          desc:res.data[0].desc
        })
      }
    })
  },
  /**
   * 载入动态
   */
  getMine(){
    var that = this
    const db = wx.cloud.database()
    const trade_info = db.collection('trade_info')

    trade_info.where({
      _openid:openId
    }).get({
      success: function(res) {
        that.setData({
          mineList:res.data.reverse()
        })
        console.log("获取动态",res.data)
      }
    })
  },
  /**
   * 载入评论列表
   */
  getComment(){
    var that = this
    const db = wx.cloud.database()
    const comment_data = db.collection('comment_data')
    comment_data.where({
      _openid: openId
    }).get({
      success(res){
        console.log("获取评论",res)
        that.setData({
          commentList:res.data.reverse()
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("查看用户:",options.id)
    // 传入的id即为openid
    openId = options.id
    // 1.载入信息
    this.loadUserInfo()
    this.getComment()
    this.getMine()
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