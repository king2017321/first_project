// pages/comment/comment.js
import { formatTime } from '../../../utils/util.js';
var getDate = formatTime(new Date());
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment_data:[]
  },

  /**
   * 从数据库获取评论
   */
  getCommentData(){
    var that = this
    const db = wx.cloud.database()
    const comment_data = db.collection('comment_data')
    comment_data.get({
      success(res){
        console.log("获取评论",res)
        that.setData({
          comment_data:res.data.reverse()
        })
      }
    })
  },

  // 测试用：生成一条评论
  newComment(){
    // 云开发方法
    var that = this
    const db = wx.cloud.database()
    const add_trade_info = db.collection('comment_data')
    add_trade_info.add({
      data:{
        username:"ring",
        date:getDate,
        avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/I9pOtx2UVsiaFa58wfZia6Ey9H8NgEmicWm4CH0xoXSm4GR2QgjfDtMtibP0llIL3XOeLde8lgicNsoExic5rnc9QicRw/132",
        commentText:"not bad"
      },
      success(res) {
        console.log("add_info",res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取评论
    this.getCommentData()
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