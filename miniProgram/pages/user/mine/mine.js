// pages/mine/mine.js
import { formatTime } from '../../../utils/util.js';
var getDate = formatTime(new Date());
var openId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tradeList:[],
    trade_with_id:""
  },

  /**
   * 获取所有记录
   */
  getTradeList(){
    var that = this
    // 云开发方法
    // 1. 获取数据库引用
    const db = wx.cloud.database()
    const trade_info = db.collection('trade_info')

    trade_info.where({
      _openid:openId
    }).get({
      success: function(res) {
        that.setData({
          tradeList:res.data.reverse()
        })
        console.log("get_list",res.data)
      }
    })




    // 后端服务器的方法
    // wx.request({
    //   url:"http://localhost:8080/user/info/trade_list",
    //   success(res){
    //     console.log(res)
    //     that.setData({
    //       tradeList:res.data
    //     })
    //   }
    // })
  },

  /*
  *点击删除
  */
  deleteItem(e){
    var that = this
    var id = e.currentTarget.id
    console.log(e)
    console.log("id:",id)
    // 云开发方法
    const db = wx.cloud.database()
    db.collection('trade_info').doc(id).remove({
      success: function(res) {
        console.log("remove",res)
        that.getTradeList()
      }
    })
    


    // 后端服务器的方法
    // wx.request({
    //   url: 'http://localhost:8080/user/info/delete_trade_with_id?id='+id,
    //   success(res){
    //     console.log(res)
    //     that.setData({
    //       tradeList:res.data
    //     })
    //   }
    // })

  },


  /**
   * 添加数据 
   */
  addItem(){
    // 云开发方法
    const db = wx.cloud.database()
    const add_trade_info = db.collection('trade_info')
    var that = this

    
    add_trade_info.add({
      data:{
        // _openid:""
        date:getDate,
        trade_with:'ring',
        // 待修改;获取别的对象的id
        trade_with_id:openId
      },
      success(res) {
        console.log("add_info",res)
      }
    })


    // 服务器方法
    // wx.request({
    //   url:"http://localhost:8080/user/info/trade_with?tuser=ring",
    //   success(res){
    //   }
    // })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.给全局的openid赋值,毕竟经常用
    wx.cloud.callFunction({
      name: 'getOpenId',
      success(res){
        openId = res.result.openid
      }
    })
    // 2.获取交易信息
    this.getTradeList()
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
    this.addItem()
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