// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (context) => {
  const wxContext = cloud.getWXContext()
  return {
    // event,
    openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}
/*
调用的方法，promise的方式也可以
wx.cloud.callFunction({
  // 需调用的云函数名
  name: 'getOpenId',
  // 成功回调
  complete: console.log
})
wx.cloud.callFunction({
  // 需调用的云函数名
  name: 'getOpenId',
}).then(console.log)
*/