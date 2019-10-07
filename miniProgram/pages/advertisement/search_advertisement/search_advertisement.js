// pages/search_advertisement/search_advertisement.js
const db = wx.cloud.database({
  env: 'cloudpg-v0ty3'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    input_value:"",
    hasmore: true,
    number: 0,//剩余记录条数
    skipnum1: 0,//跳过条数
    skipnum2:0,
    skipnum3:0,
    has:0
  },
  //查看详情
  viewItem: function (event) {
    var id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../advertisement_detail/advertisement_detail?id=' + id,
    })
  },
  search_input: function (e) {
    this.setData({
      input_value: e.detail.value
    })
  },
  //提交查询
  formSubmit: function (e) {
    var that = this
    //符合查询条数
    db.collection("advertisement").where({
      // name: _name,
      title: {
        $regex: '.*' + that.data.input_value,
        $options: 'i'
      }
    }).count({
      success:res=>{
        console.log(res.total)
        if(res.total>0){
          that.setData({
            has:1
          })
        }
        //查询作者
        db.collection("advertisement").where({
          who: {
            $regex: '.*' + that.data.input_value,
            $options: 'i'
          }
        }).count({
          success: res => {
            console.log(res.total)
            if (res.total > 0) {
              that.setData({
                has: 1
              })
            }

            //查询简介
            db.collection("advertisement").where({
              brief_description: {
                $regex: '.*' + that.data.input_value,
                $options: 'i'
              }
            }).count({
              success: res => {
                console.log(res.total)
                if (res.total > 0) {
                  that.setData({
                    has: 1
                  })
                }
                //开始显示查询
                if (this.data.has == 0) {
                  wx.showToast({
                    title: '没有找到你想要的结果',
                  })
                }
                else {
                  console.log("y")
                  //得到查询
                  var list = []
                  //查询title
                  db.collection("advertisement").where({
                    title: {
                      $regex: '.*' + that.data.input_value,
                      $options: 'i'
                    }
                  })
                    .limit(15)
                    .get({
                      success: res => {
                        list = list.concat(res.data)
                        console.log(res.data)
                        console.log(list)
                        that.setData({
                          number: that.data.number - 15,
                          skipnum1: 15 + that.data.skipnum1
                        })

                        //查询作者
                        db.collection("advertisement").where({
                          who: {
                            $regex: '.*' + that.data.input_value,
                            $options: 'i'
                          },
                        })
                          .limit(15)
                          .get({
                            success: res => {
                              list = list.concat(res.data)
                              console.log(list)
                              that.setData({
                                number: that.data.number - 15,
                                skipnum2: 15 + that.data.skipnum2
                              })

                              //查询文本
                              db.collection("advertisement").where({
                                brief_description: {
                                  $regex: '.*' + that.data.input_value,
                                  $options: 'i'
                                }
                              })
                                .limit(15)
                                .get({
                                  success: res => {
                                    list = list.concat(res.data)
                                    console.log(list)
                                    //  var tlist = new Set(list)
                                    console.log(tlist)
                                    that.setData({
                                      list: list,
                                      number: that.data.number - 15,
                                      skipnum3: 15 + that.data.skipnum3
                                    })
                                    console.log(list)
                                  }
                                })
                            }
                          })
                      }
                    })
                }
              }
            })
          }
        })
      }
    })
    
  },
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
    var that = this
    // if(that.data.number<=0){
    //   that.setData({
    //     hasmore:false
    //   })
    //   wx.showToast({
    //     title: '没有更多了',
    //   })
    // }
    
    console.log("y")
    //得到查询
    var tlist = new Set()
    var list = []
    //查询title
    db.collection("advertisement").where({
      title: {
        $regex: '.*' + that.data.input_value,
        $options: 'i'
      }
    }).skip(skipnum1)
      .limit(15)
      .get({
        success: res => {
          list = list.concat(res.data)
          console.log(res.data)
          console.log(list)
          that.setData({
            number: that.data.number - 15,
            skipnum1: 15 + that.data.skipnum1
          })

          //查询作者
          db.collection("advertisement").where({
            who: {
              $regex: '.*' + that.data.input_value,
              $options: 'i'
            },
          }).skip(skipnum2)
            .limit(15)
            .get({
              success: res => {
                list = list.concat(res.data)
                console.log(list)
                that.setData({
                  number: that.data.number - 15,
                  skipnum2: 15 + that.data.skipnum2
                })

                //查询文本
                db.collection("advertisement").where({
                  brief_description: {
                    $regex: '.*' + that.data.input_value,
                    $options: 'i'
                  }
                }).skip(skipnum3)
                  .limit(15)
                  .get({
                    success: res => {
                      list = list.concat(res.data)
                      console.log(list)
                      that.setData({
                        list: list,
                        number: that.data.number - 15,
                        skipnum3: 15 + that.data.skipnum3
                      })
                      console.log(list)
                    }
                  })
              }
            })
        }
      })
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})