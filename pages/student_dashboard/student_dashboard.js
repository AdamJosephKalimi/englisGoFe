// pages/student_dashboard/student_dashboard.js
var app = getApp()
Page({

  data: {

  },
  onLoad: function (options) {

  },

  set_box_classes: function (lessons) {
    lessons.forEach((lesson) => {
      console.log("in here")
      var id = lesson.assignment_id;
      let graded = (lesson.grading_id != null)
      let submitted = (lesson.submission_id != null)

      if (graded) {
        // id element gets graded class
        var box_class_name = `box${id}_class`
        var box_class = {}
        box_class[box_class_name] = 'graded'
        this.setData(box_class)

      } else if (submitted) {
        // id element gets submitted class
        var box_class_name = `box${id}_class`
        var box_class = {}
        box_class[box_class_name] = 'submitted'
        this.setData(box_class)
      }
    });
  },

  onReady: function () {
    var that = this

    // var endpoint = 'https://english-go.herokuapp.com/api/v1/lessons'
    var openId = app.globalData.open_id
    var authToken = app.globalData.authentication_token
    console.log('loading lessons')
    var endpoint = 'http://localhost:3000/api/v1/lessons'
    wx.request({
      url: endpoint,
      data: {
        user_open_id: openId,
        user_token: authToken,
        student_id: 8
      },
      success: function (res) {
        // res contains all the HTTP request data
        console.log('success!' + res.statusCode);
        console.log(res.data);
        // Update local data storage
        let lessons = res.data
        that.setData({
          lessons: lessons
        })

        that.set_box_classes(lessons)
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
