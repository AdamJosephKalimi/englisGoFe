var app = getApp();

// pages/teacher_dashboard/teacher_dashboard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      mode: 'aspectFit',
      text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
    }],
    students: [
      { src: '../../image/Batch 122-32.jpg' },
      { src: '../../image/Batch 122-32.jpg' },
      { src: '../../image/Batch 122-32.jpg' },
      { src: '../../image/Batch 122-32.jpg' },
      { src: '../../image/Batch 122-32.jpg' },
      { src: '../../image/Batch 122-32.jpg' },
      { src: '../../image/Batch 122-32.jpg' },
      { src: '../../image/Batch 122-32.jpg' },
      { src: '../../image/Batch 122-32.jpg' },
      { src: '../../image/Batch 122-32.jpg' },
    ]
    // Must be able to dynamically import photos
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady: function (options) {
    this.setData({
      teacher_img: app.globalData.userInfo.avatarUrl,
      teacher_name: app.globalData.userInfo.nickName
    })

    var openId = app.globalData.open_id
    var authToken = app.globalData.authentication_token
    var domain = app.globalData.prod_domain
    var endpoint = `${domain}/api/v1/lessons`

    // get student_id
    wx.request({
      url: endpoint,
      data: {
        user_open_id: openId,
        user_token: authToken,
        from_teacher: true
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
      }
    })
  },
  postNewLesson: function (assignmentId) {
    console.log(assignmentId)
    var openId = app.globalData.open_id
    var authToken = app.globalData.authentication_token
    var domain = app.globalData.prod_domain

    wx.request({
      method: 'POST',
      url: `${domain}/api/v1/lessons`,
      data: {
        user_open_id: openId,
        user_token: authToken,
        massCreate: true,
        lesson: {
          assignment_id: assignmentId
        }
      },
      success: function (response){
        let res = response.data;
        var id = res.id
        console.log(response.data)
      },
      fail: function (res) {
        console.log('failed!' + res.statusCode);
      }
    })
  },

<<<<<<< HEAD
  toLessons: function (event) {
    let id = event.currentTarget.dataset.ass_id
    console.log(id)
    // this.postNewLesson(id)
    // totally gonna fake it here
    wx.navigateTo({
      url: `../lesson/lesson?lesson=${id}`,
    })
  },

  studentAvatar: function () {
    wx.navigateTo({
      //Route to a student index linked to this teacher
      url: "../teacher_student_dashboard/teacher_student_dashboard",
=======
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toLesson: function () {
    wx.navigateTo({
      url: "../lesson/lesson",
    })
  },
  studentAvatar: function () {
    wx.navigateTo({
      url: "../teacher_student_avatar/teacher_student_avatar",
    })
  },

  
  toMyStudents: function () {
    wx.navigateTo({
      //Route to a student index linked to this teacher
      url: "../teacher_student_avatar/teacher_student_avatar",
>>>>>>> d9a26fb... progress on lesson form and deleted assignment
    })
  }
})
