// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const neituiId = event.neituiId
  await db.collection('Neitui').where({
    _id: neituiId
  }).update({data:
    {company: event.company,
    introduce: event.introduce,
    img_path: event.img_path}
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}