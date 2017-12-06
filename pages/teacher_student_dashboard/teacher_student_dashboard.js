var app = getApp()

// pages/teacher_student_dashboard/teacher_student_dashboard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      mode: 'aspectFit',
      text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
    }],
    src: '../../image/cityBanner.png',
    box1_class: 'assigned',
    box2_class: 'assigned',
    box3_class: 'assigned',
    box4_class: 'assigned',
    box5_class: 'assigned',
    box6_class: 'assigned',
    box7_class: 'assigned',
    box8_class: 'assigned',
    box9_class: 'assigned',
    box10_class: 'assigned',
    box11_class: 'assigned',
    box12_class: 'assigned',

    lessons: [
      {
        'id': '1',
        'teacher_id': '1',
        'user_id': '1',
        'assignment_id': '1',
        'submission_id': '1',
      },
      {
        'id': '1',
        'teacher_id': '1',
        'user_id': '1',
        'assignment_id': '2',
        'submission_id': '2',
      },
      {
        'id': '1',
        'teacher_id': '1',
        'user_id': '1',
        'assignment_id': '3',
        'submission_id': '3',
        'grading_id': '1'
      }
    ],
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ student_img: app.globalData.userInfo.avatarUrl })
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

  },
  toAssignments: function () {
    wx.navigateTo({
      //Route to a student index linked to this teacher
      url: "../lesson/lesson",
    })
  }
})
