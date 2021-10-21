// index.js
// 获取应用实例
const config = require('../../config/config.js');

const app = getApp()
Page({
  data: {
    config,
    checked: true,
    dishesObjects: null,
  },
  
  onLoad() {
    this.getDishesObjects()
  },
  getDishesObjects(){
    var that = this
    wx.getStorage({
      key: 'dishesObjects',
      success: function (res) {
        console.log("成功获取到数据...")
        console.log(res)
        that.setData({
          dishesObjects: res.data,
          loading: false
        });
      },
      fail: function (e) {
        console.log(e,"没有找到，从配置中加载默认数据")
        //没有找到，从配置中加载默认数据
        wx.setStorage({
          key: "dishesObjects",
          data: config.dishesObjects,
          success: function (res){
            console.log("存储成功，重新读取...");
            that.getDishesObjects();
          },
          fail: function () {
            console.log("存储失败，提示用户...");
          }
        })
      }
    })
  },
})
