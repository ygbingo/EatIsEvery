// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '开始',
    eatWhat: '一会儿吃什么',
    foodlist: '美食列表',
    startTime: 0,
    lastStartTime: 0,
    startRun: false,
    userInfo: {},
    address: '未知星球',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  startViewTap() {
    console.log(this.data.startTime)
    if (this.data.motto == "开始" || (this.data.motto == "再一次" && this.data.startTime < 5)){
      this.setData({
        motto: "就它了"
      })
      this.data.startRun = true
      var foodlist = this.getFoodList()
      var that = this
      this.data.timer = setInterval(function() {
        var randomIndex = Math.floor((Math.random() * 100 % foodlist.length))
        that.setData({
          eatWhat: foodlist[randomIndex]
        })
      }, 100);
    }else if(this.data.motto == "就它了"){
      clearInterval(this.data.timer)
      this.setData({
        motto: "再一次"
      })
      this.data.startRun = false
    }
    if (this.data.motto == "再一次" && this.data.startTime >= 5){
      this.setData({
        motto: "好了，你不饿",
        eatWhat: "别吃了！"
      })
    }
    
    this.setData({
      startTime: this.data.startTime + 1
    })
    
    
  },

  findMore() {
    wx.navigateToMiniProgram({
      appId: 'wx734c1ad7b3562129'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.getNowTime()
    this.getLocation()
  },
  getLocation(e) {
    var temp_address
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
        temp_address = res.latitude + "," + res.longitude
        this.setData({
          address: temp_address
        })
      }
    })
    
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getNowTime(e) {
    var myDate = new Date()
    var nowHours = myDate.getHours()
    var timenow = '一会儿'
    if(nowHours<10){
      timenow = '早饭'
    }else if(nowHours<14){
      timenow = '午饭'
    }else if(nowHours<20){
      console.log(nowHours)
      timenow = '晚饭'
    }else{
      timenow = '夜宵'
    }
    this.setData({eatWhat: timenow + '吃什么'})
  },
  runMarquee(e) {
    var foodlist = this.getFoodList()

    while(this.data.startRun){
     for(var food in foodlist){
       this.setData({eatWhat: food})
       this.sleep(500)
     }
    }
  },
  getFoodList(e) {
    var foodlist = ['麻辣拌', '麻辣盆', '鸡骨架', '炸鸡', '汉堡']
    return foodlist
  },
  sleep(e, ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
  }
})
