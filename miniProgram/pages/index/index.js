const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  
  data: {

     slides: [
      { image: 'http://ww1.sinaimg.cn/mw690/006ThXL5ly1fj7zx3w751j30u00dmgy3.jpg', link: '' },
      { image: 'http://ww1.sinaimg.cn/mw690/006ThXL5ly1fj6ckx9tlwj30u00fqk8n.jpg', link: '/pages/list/list?cat=10' }
    ],

    /**
     *  自己改自己的模块
     * @icon -图标位置
     * @name -模块名称
     * @url -页面地址
     */
     categories : [
       { icon: '/assets/second-hand-transactions.png', name: '二手交易', url:'/pages/second_hand_transaction/index/index' },
       { icon: '/assets/second-hand-transactions.png', name: '广告', url:'/pages/advertisement/advertisement_index/advertisement_index' },
       { icon: '/assets/second-hand-transactions.png', name: '内推', url:'/pages/neitui_page/daf/daf' },
       { icon: '/assets/second-hand-transactions.png', name: '租房', url:'/pages/renthouse/index/index' },
       { icon: '/assets/second-hand-transactions.png', name: '曝光', 
url: '/pages/exposure/index/index' },
       { icon: '/assets/second-hand-transactions.png', name: '失物招领',url: '/pages/shiwuzhaoling/104/104'},
       { icon: '/assets/second-hand-transactions.png', name: 'XX', category_id: 7 },
       { icon: '/assets/second-hand-transactions.png', name: 'XX', category_id: 8 },
       { icon: '/assets/second-hand-transactions.png', name: 'XX', category_id: 9 }
    ]
  }
})
