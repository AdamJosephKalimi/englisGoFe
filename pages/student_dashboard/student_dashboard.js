// pages/student_dashboard/student_dashboard.js
var app = getApp()
Page({

  data: {
    lessons: null,
    userInfo: {}
  },

  // have user info passed in when page is opend {user: openid}

  onLoad: function (options) {
    this.checkFetchLessons()
  },
  checkFetchLessons: function () {
    var openId = app.globalData.open_id
    var that = this
    if(typeof openId === 'undefined'){
      return setTimeout(function(){
        console.log('no open id yet?')
        that.checkFetchLessons()
      }, 1000)
    }
    return this.fetchLessons()
  },
  fetchLessons: function(){
    var that = this
    // var endpoint = 'https://english-go.herokuapp.com/api/v1/assignments'
    var openId = app.globalData.open_id
    var authToken = app.globalData.authentication_token
    console.log('loading lessons/assignments')
    var endpoint = 'http://localhost:3000/api/v1/lessons'
    wx.request({
      url: endpoint,
      data: {
        user_open_id: openId,
        user_token: authToken
      },
      success: function (res) {
        // res contains all the HTTP request data
        console.log('success!' + res.statusCode);
        // console.log(res.data);
        // Update local data storage
        let lessons = res.data
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
  // imbed within fetch assignments?
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

  handleCardTap: function(event) {
    let lessonId = event.currentTarget.dataset.lesson_id
    let id = event.currentTarget.dataset.id

    wx.navigateTo({
        url: `../form/form?lesson=${lessonId}`  // assignment=${assignmentId}&
      })

    // if (!lessonId) {
    //   console.log('Hasn\'t started the assignment yet, creating one')
    //   this.postNewLesson(id)
    // } else {
    //   console.log('Student already started or finished, directly navigating to the page')
    // }
  },

  // this needs to happen when teacher shares?!
  //
  // postNewLesson: function (assignmentId) {
  //   console.log(assignmentId)
  //   var openId = app.globalData.open_id
  //   var authToken = app.globalData.authentication_token
  //   wx.request({
  //     method: 'POST',
  //     url: 'http://localhost:3000/api/v1/lessons', // change to Heroku when ready
  //     data: {
  //       user_open_id: openId,
  //       user_token: authToken,
  //       lesson: {
  //         assignment_id: assignmentId
  //       }
  //     },
  //     success: function (response){
  //       let res = response.data;
  //       var lessonId = res.id
  //       var assignmentId = res.assignment_id
  //       console.log(response.data)
  //       wx.navigateTo({
  //         url: `../form/form?assignment=${assignmentId}&lesson=${lessonId}`
  //       })
  //     },
  //     fail: function (res) {
  //       console.log(res.data);
  //       console.log('failed!' + res.statusCode);
  //     }
  //   })
  // },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },

  onReady: function () {
  }
})
