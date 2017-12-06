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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    })
  }
})