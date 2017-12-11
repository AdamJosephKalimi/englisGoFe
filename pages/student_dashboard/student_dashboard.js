// pages/student_dashboard/student_dashboard.js
var app = getApp()
Page({

  data: {
    lessons: null,
    userInfo: {}
  },

  // have user info passed in when page is opend {user: openid}
  onReady: function () {
     this.setData({
      student_img: app.globalData.userInfo.avatarUrl,
      student_name: app.globalData.userInfo.nickName
     })
     // wx.request to /lessons?user_id=student_id
     // on success: res.data.lessons.each { put lessons into the boxes, with data-lesson_id = lesson.id}
  },

  onLoad: function (options) {
    //this.checkFetchLessons()
    var that = this
    that.setData({
      openId: app.globalData.open_id,
      authToken: app.globalData.authentication_token,
      userId: app.globalData.user_id
    })
    var domain = app.globalData.prod_domain
    var endpoint = `${domain}/api/v1/lessons?user_id=${that.data.userId}`
    // debugger
    wx.request({
      url: endpoint,
      data: {
        user_open_id: that.data.openId,
        user_token: that.data.authToken,
        user_id: that.data.userId,
        from_teacher: false
      },
      success: function (res) {
        // res contains all the HTTP request data
        console.log('success!' + res.statusCode);
        // Update local data storage
        let lessons = res.data
        console.log(lessons)
        that.setData({
          lessons: lessons
        })
        that.set_box_classes(lessons)
      },
      fail: function (res) {
        // console.log(res.data);
        console.log('failed!' + res.statusCode);
      }
    })

  },

  set_box_classes: function (lessons) {
      console.log("in here")
    console.log(lessons)
    lessons.forEach((lesson) => {
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


  toLessons: function(event) {

  // The line below was causing merge conflict
  // not sure which is the right function

  // toAssignments: function(event) {

    var that = this
    let id = event.currentTarget.dataset.ass_id

    wx.navigateTo({
        url: `../lesson/lesson?lesson=${id}`  //
      })

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })

  },
})
