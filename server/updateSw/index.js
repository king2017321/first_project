// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const swId = event.swId
  await db.collection('shiwzl').where({
    _id: swId
  }).update({
    data:
    {
      company: event.company,
      place: event.place,
      introduce: event.introduce,
      img_path: event.img_path
    }
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}