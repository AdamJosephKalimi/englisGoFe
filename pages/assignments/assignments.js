// pages/assignments/assignments.js
Page({

  data: {
    assignment: null,
    content: null,
    voice: null
  },

  onLoad: function (options) {
    var that = this
    var endpoint = 'https://english-go.herokuapp.com/api/v1/assignments/index'
    wx.request({
      // this part is not yet dynamic
      url: endpoint + 1,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        // res contains all the HTTP request data
        console.log('success!' + res.statusCode);
        console.log(res.data);
        // Update local data storage
        let assign = res.data
        that.setData({
           content: assign.content,
           voice: assign.voice
        })
      },
      fail: function (res) {
        console.log(res.data);
        console.log('failed!' + res.statusCode);
      },
      complete: function (res) {
        console.log(res.data);
        console.log('completed!' + res.statusCode);
      }
    })
  },

  onReady: function () {

  },


  onShow: function () {

  },


  onHide: function () {

  },

  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})
