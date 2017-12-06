//app.js

App({
  loginAndGetAPIUserInfo: function() {
    var that = this
    wx.login({
      withCredentials: true,
      success: function (res) {
        var code = res.code
        wx.getUserInfo({
          success: function (res) {

            that.globalData.userInfo = res.userInfo
            that.sendCodeToBackend(code, res)

            typeof cb == "function" && cb(that.globalData.userInfo)
            console.log(that.globalData.userInfo)
          }
        })
      }
    })
  },
  onLaunch: function () {
    console.log("Launching!!!!")
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.loginAndGetAPIUserInfo()
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      this.loginAndGetAPIUserInfo()
    }
  },
  sendCodeToBackend: function (code, res) {
    var that = this
    var domain = that.globalData.dev_domain
    wx.request({
      url: `${domain}/api/v1/users`,
      method: 'POST',
      data: {
        code: code,
        user: {
          username: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl
        } },
      success: function (res) {
        console.log('done with sendCodeToBackend')
        console.log(res)
        that.globalData.is_teacher = res.data.is_teacher
        that.globalData.open_id = res.data.open_id
        that.globalData.username = res.data.username
        that.globalData.authentication_token = res.data.authentication_token
        console.log("Global Data now:")
        console.log(that.globalData)

      },
      fail: function (err) {
        console.log('faield')
        console.error(err)
      }
    })
  },
  globalData: {
    userInfo: null,
    prod_domain: 'root@101.37.31.161',
    dev_domain: 'http://localhost:3000'
  }
})
