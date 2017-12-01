// pages/assignments/assignments.js
const AV = require('../../utils/av-weapp-min.js');
const Form = require('../../model/form.js');
var app = getApp()
Page({

  data: {
    assignments: null,
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
           assignments: list
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

  handleCardTap: function(event) {
    console.log(event)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../form/form?assignment=${id}`
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
