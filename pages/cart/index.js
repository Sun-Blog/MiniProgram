import {getSetting,chooseAddress,openSetting} from '../../utils/asyncWx'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  }, 

  onShow (){
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];

    this.setData({
      address,
    });
    this.setCart(cart);
  },

  // 点开收货地址按钮
  async handleChooseAddress(){
    try {
      // 获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 判断权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      // 调用获取收货地址api
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      // 存入缓存中
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },

  // 商品选中
  handleItemChange(e){
    // 获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 选中取反
    cart[index].checked = !cart[index].checked;
    // 购物车中的数据重新设置回data和缓存中
    this.setCart(cart);
  },

  // 设置购物车状态的同时，重新计算 底部工具栏的数据
  setCart(cart){
    let allChecked = true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    });
    // 判断数组是否为空，若为空，则复选框不选中
    allChecked=cart.length!=0?allChecked:false;

    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart",cart);
  }
})