// pages/assignments/assignments.js
Page({

  data: {
    assignment: null,
    content: null,
    voice: null
  },

  onLoad: function (options) {
    var that = this
    // this provides the index of all assignments
    var endpoint = 'https://english-go.herokuapp.com/api/v1/assignments'
    wx.request({
      url: endpoint,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        // res contains all the HTTP request data
        console.log('success!' + res.statusCode);
        console.log(res.data);
        // Update local data storage
        let list = res.data
        that.setData({
           assignment_id: list.id,
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
