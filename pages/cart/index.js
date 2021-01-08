// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点开收货地址按钮
  handleChooseAddress(){
    wx.getSetting({
      success: (result)=>{
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress===true || scopeAddress===undefined) {
          wx.chooseAddress({
            success: (result1)=>{
              console.log(result1);
            }
          })
        }else{
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3)=>{
                  console.log(result3);
                }
              })
            }
          });
        }
      }
    });
  }
})