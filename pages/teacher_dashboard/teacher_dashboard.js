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
    teacher_img: '../../image/Batch 122-32.jpg',
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
    // get student_id, student photo (which is currently not being saved to the backend)
  },

  postNewLesson: function (assignmentId) {
    console.log(assignmentId)
    var openId = app.globalData.open_id
    var authToken = app.globalData.authentication_token
    wx.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/lessons', // change to Heroku when ready
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
        wx.navigateTo({
          url: `../lesson/lesson?lesson=${id}`
        })
      },
      fail: function (res) {
        console.log(res.data);
        console.log('failed!' + res.statusCode);
      }
    })
  },

  toLessons: function () {
    let id = event.currentTarget.dataset.ass_id
    postNewLesson(id)

    // this acts as the default route
    // no else case if the lesson for that assignment as already been created
    wx.navigateTo({
      url: `../lesson/lesson?assignment=${id}`,
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
    })
  }
})
