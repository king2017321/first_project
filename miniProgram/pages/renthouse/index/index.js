//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    rent:1000,
    items: [
      { name: 'areaA', value: 'A区' },
      { name: 'areaB', value: 'B区' },
      { name: 'areac', value: 'C区' },
      { name: 'areaD', value: 'D区' },
      { name: 'areaE', value: 'E区' },
    ],
    rooms:[
      { name:'big',value:'主卧'},
      { name: 'mid', value: '侧卧' },
      { name: 'small', value: '小卧' },
    ],
    elems:[
      {name:'areatype',value:'none'},
      {name:'roomtype',value:'none'},
      {name:'price',value:'none'},
    ],
    beizhu:'无',
    flag:0,
    searchelem:"none",
  
    tempImg: [],
    fileIDs: [],

    tele:'这个人未留电话',
    area:'未留面积信息',

    imgbox:''
  },
  inputtele: function (e) {
    console.log('电话:', e.detail.value)
    this.data.tele = e.detail.value

  },
  inputarea: function (e) {
    console.log('面积:', e.detail.value)
    this.data.area = e.detail.value

  },
  inputbeizhu:function(e){
    console.log('备注:',e.detail.value)
    this.data.beizhu=e.detail.value
        
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.elems[0].value=e.detail.value
  },
  roomChange: function (e) {
    console.log('room发生change事件，携带value值为：',        e.detail.value)
    this.data.elems[1].value = e.detail.value

  },
  rentinput: function(e){    
       this.data.elems[2].value=e.detail.value
  },
  inputclick:function(){
       console.log(this.data.elems[2].value),
       console.log(this.data.elems)
       /*需要将所有数据清空 并让用户确定再提交*/ 
       //下面是让用户确定的弹窗
         wx.setStorageSync('flag', 0)
         const db=wx.cloud.database()
         db.collection('house').add({
         data:{
           areatype:this.data.elems[0].value,
           roomtype:this.data.elems[1].value,
           price:this.data.elems[2].value,
           beizhu:this.data.beizhu,
           tele:this.data.tele,
           area:this.data.area
         },
         success:inputclick=>{
         console.log("创建成功")
         console.log('[数据库] [新增记录] 成功，记录 _id: ', inputclick._id)
         }
       })
      
  },
  searchinput:function(e){
       this.data.searchelem=e.detail.value
  },
  tochaxun:function(){
       wx.navigateTo({
         url: '/pages/renthouse/zhuye/zhuye',
       })
  },
  // 删除照片 
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  
  //上传图片
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var picid = e.currentTarget.dataset.pic;
    console.log(picid)
    var that = this;
    var n = 9;
    if (9 > imgbox.length > 0) {
      n = 9 - imgbox.length;
    } else if (imgbox.length == 9) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (9 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        that.setData({
          imgbox: imgbox
        });
      }
    })
  },

  submit: function () {
    wx.showLoading({
      title: '提交中',
    })
    const promiseArr = []
    let imgbox=this.data.imgbox
    this.setData({
      tempImg: imgbox
    })
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.tempImg.length; i++) {
      let filePath = this.data.tempImg[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log(error)
        })
      }))
    }
    Promise.all(promiseArr).then(res => {
      db.collection('house').add({
        data: {
          fileIDs: this.data.fileIDs, //只有当所有的图片都上传完毕后，这个值才能被设置，但是上传文件是一个异步的操作，你不知道他们什么时候把fileid返回，所以就得用promise.all
          areatype: this.data.elems[0].value,
          roomtype: this.data.elems[1].value,
          price: this.data.elems[2].value,
          beizhu: this.data.beizhu,
          tele: this.data.tele,
          area: this.data.area
        }
      })
        .then(res => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
          })
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
})
