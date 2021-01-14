// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        name: "体验问题",
        isActive: true,
      },{
        id: 1,
        name: "商品、商家投诉",
        isActive: false,
      }
    ]
  },

  // 根据标题索引来激活选中标题数组
  changeTitleByIndex(index){
    // 修改原属组
    let {tabs} = this.data;
    tabs.forEach((v,i) => i === index ? v.isActive = true : v.isActive = false);
    // 重新复制data
    this.setData({
      tabs
    })
  },

  // tab切换
  handleTabsItemChange(e){
    // 获取点击标题索引
    const {index} = e.detail;
    this.changeTitleByIndex(index)
  },
})