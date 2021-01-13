// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    historyInfo:[
      {
        his_num: 0,
        his_name:'收藏的店铺'
      },{
        his_num: 0,
        his_name:'收藏的商品'
      },{
        his_num: 0,
        his_name:'关注的商品'
      },{
        his_num: 0,
        his_name:'我的足迹'
      }
    ]
  },
  onShow(){
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({userInfo})
  }
})