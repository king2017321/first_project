// pages/publish_advertisement/publish_advertisement.js
wx.cloud.init({
  env: 'cloudpg-v0ty3'
})
const db=wx.cloud.database({
  env: 'cloudpg-v0ty3'
})
var app = getApp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[],
    title:"",
    who:"",
    brief_description:"",
    count: 0,
    imageID:[]
  },
  input_title: function(e){
    this.setData({
      title: e.detail.value
    })
  },
  input_who: function (e) {
    this.setData({
      who: e.detail.value
    })
  },
  input_brief_description: function (e) {
    this.setData({
      brief_description: e.detail.value
    })
  },
  previewImage: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.files;

    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  chooseImage: function (){
    var that = this
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var files = that.data.files
        // 再生出一个files,避免覆盖原有files
        if(that.data.files.length>=2){
          return
        }
        for(var i =0;i<tempFilePaths.length;i++){
           files.push(tempFilePaths[i])
        }
        that.setData({
          files: files
        })
        // setData做什么用？上传的图片放到哪了  使用setData放到files中？怎么预览？预览的文件数据从哪里来 从files来
        console.log(res.tempFilePaths)

        //wx.setStorage({ key: "card", data: files })
      }
    })
  },
  getCount: function (e) {
    //已输入的字数
    var that = this
    db.collection('test').count({
      success: res => {
        that.setData({
          count: Number(res.total) + 1
        })
      }
    })},
    uploadding:function(e){
      var imageID = this.data.imageID
      var files = this.data.files
      if(e==files.length){
        db.collection('advertisement').add({
          data:{
            imageID: this.data.imageID,
            title: this.data.title, //用户输入的文字
            who: this.data.who,
            brief_description: this.data.brief_description,
            userId: wx.getStorageSync('userId'),
            username: wx.getStorageSync('username'), //用户名
          },
          success: res => {
          wx.showToast({
          title: '发布成功',
          })
         setTimeout(() => {

                wx.navigateBack({
                })
              }, 1000)
            },
            fail: e => {
              wx.showToast({
                title: '发布错误',
              })
              console.log(e)
            }
          })
        
        return
      }
      //图片文件数大于0，开始递归上传图片
      if(files.length>0){
        var upfiles = this.data.imageID
        //用时间戳命名
        let timestamp = (new Date()).valueOf();
        wx.cloud.uploadFile({
          cloudPath: timestamp+'.png',
          filePath: files[e],
          success :res =>{
            console.log("y")
            console.log(res.fileID)
            upfiles.push(res.fileID)
            this.setData({
            imageID:  upfiles
            })
            e = e + 1
            this.uploadding(e)
          },
          fail :res=>{
            wx.showToast({
              title: '上传失败',
            })
          }
        })
      }
      
    }
    ,
  formSubmit: function(e){
    var that = this
    this.getCount (e)
    var data = {
        imageID: [], //将图片储存为数组类型
        title: this.data.title, //用户输入的文字
        who : this.data.who,
        brief_description: this.data.brief_description,
        userId: wx.getStorageSync('userId'),
        username: wx.getStorageSync('username'), //用户名
    }
    //上传到数据库的集合中
    if(data.title&&data.who&&data.brief_description){
      //console.log(data.imageID[0])
      this.uploadding(0)
    }
       else {
        wx.showToast({
          title: '请保证已填写标题，发布者和内容',
          icon: 'none'
        })
      }

  //要知道云文件的ID，即把ID也存入字段，调用的时候调用字段中的ID才能下载图片
  }
,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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