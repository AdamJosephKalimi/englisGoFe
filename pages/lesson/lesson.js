const qiniuUploader = require("../../utils/qiniuUploader.js");

var app = getApp()
var filePath;

Page({
  data: {
    lesson_id: null,
    content: null,
    voice: null,
    lesson: null,
    recording_path: null,
    storage_path: null,
    storage_key: null,
    storage_hash: null,
    qiniuUpToken: null,
    qiniuKey: null,
    student_recording_path: null,
    teacher_recording_path: null,
    is_recording: false,
    content: null,
    title: null,
    keywords: null
  },
  array: [{
    mode: 'aspectFit',
    text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
  }],

  initQiniu: function() {
    var that = this
    // var qiniuUpToken = that.data.qiniuUpToken
    var options = {

      region: 'ECN',
      uptoken: `${that.data.qiniuUpToken}`,
      domain: 'http://p0hdqjyyy.bkt.clouddn.com',
      shouldUseQiniuFileName: false
    };
    qiniuUploader.init(options);
  },

  studentRecordClicked: function() {
    let is_recording = this.data.is_recording
    console.log("recording?" + is_recording)
    if (is_recording) {
      this.stopRecording()
    } else {
      this.startStudentRecording()
    }

    this.setData({ is_recording: !is_recording })

  },

  startStudentRecording: function () {
    var that = this
    wx.startRecord({
      success: function (res) {
        that.setData({
          student_recording_path: res.tempFilePath
        })
        console.log('start recording finished')
        that.playRecording(res.tempFilePath)
        console.log(that.data.student_recording_path)

        setTimeout(function () {
          wx.pauseVoice()
        }, 200000)
      }
    })
  },
  teacherRecordClicked: function () {
    let is_recording = this.data.is_recording
    console.log("recording?" + is_recording)
    if (is_recording) {
      this.stopRecording()
    } else {
      this.startTeacherRecording()
    }

    this.setData({ is_recording: !is_recording })

  },

  startTeacherRecording: function () {
    var that = this
    wx.startRecord({
      success: function (res) {
        that.setData({
          teacher_recording_path: res.tempFilePath
        })
        console.log('start recording finished')
        that.playRecording(res.tempFilePath)
        console.log(that.data.teacher_recording_path)

        setTimeout(function () {
          wx.pauseVoice()
        }, 200000)
      }
    })
  },
  stopRecording: function () {
    wx.stopRecord()
  },
  playRecording: function (recording_path) {
    var that = this
    console.log(recording_path)
    wx.playVoice({
      filePath: recording_path,
      complete: function () {
      }
    })
  },
////////////////////////////////////////////////////
  playButtonClicked: function (e) {
    this.playRecording(e.currentTarget.dataset.recording_file)
  },

////////////////////////////////////////////////////

  setQiniu: function () {

  uploadVoice: function() {
    var that = this
    var domain = app.globalData.prod_domain

    wx.request({
      url: `${domain}/api/v1/file_upload`,
      data: {
        user_open_id: app.globalData.open_id,
        user_token: app.globalData.authentication_token
      },
      success: function (res) {
        // res contains all the HTTP request data
        console.log('success!' + res.statusCode);
        console.log(res.data);
        // Update local data storage
        let qiniu = res.data
        that.setData({
          qiniuUpToken: qiniu.token,
          qiniuKey: qiniu.key
        })
        that.initQiniu();
      },
      fail: function (res) {
        console.log('failed!' + res.statusCode);
      },
    })
// =======
//     qiniuUploader.upload(filePath, (res) => {
//       console.log(res);
//       that.setData({
//         storage_path: res.voiceUrl,
//         storage_key: res.key,
//         storage_hash: res.hash
//       });
//     }, (error) => {
//       console.error('error: ' + JSON.stringify(error));
//     },
//     {
//       region: 'ECN',
//       uptoken:"PJP0bjvUkPBLO3PmSgAfuVyEh9aTAlzYmiItmRCm:f6iSqqM_s10YphHPt9GVlzSBal0=:eyJzY29wZSI6ImVuZ2xpc2hnbzp0ZXN0dm9pY2Uuc2lsayIsImRlYWRsaW5lIjoxNTEyNjExNDc3LCJ1cGhvc3RzIjpbImh0dHA6Ly91cC5xaW5pdS5jb20iLCJodHRwOi8vdXBsb2FkLnFpbml1LmNvbSIsIi1IIHVwLnFpbml1LmNvbSBodHRwOi8vMTgzLjEzMS43LjE4Il0sImdsb2JhbCI6ZmFsc2V9",
//       domain: 'http://p0hdqjyyy.bkt.clouddn.com',
//       shouldUseQiniuFileName: false,
//       key: 'thebestvoice.silk'
//     }
//     );
// >>>>>>> ab0e275... dashboards changed, getting integrated with backend
//   },
//   onReady: function () {

// <<<<<<< HEAD
//     this.setQiniu();
// =======
//   downloadVoice: function (){
//     wx.downloadFile({
// <<<<<<< HEAD
//       url: 'http://p0hdqjyyy.bkt.clouddn.com/testvoice.silk',
// =======
//     url: 'http://p0hdqjyyy.bkt.clouddn.com/thebestvoice.silk',
// >>>>>>> ab0e275... dashboards changed, getting integrated with backend
//     // `http://p0hdqjyyy.bkt.clouddn.com${subKey}`, //仅为示例，并非真实的资源
//     success: function(res) {

//         if (res.statusCode === 200) {
//             wx.playVoice({
//               filePath: res.tempFilePath
//           })
//         }
//       }
//     })
// >>>>>>> d9a26fb... progress on lesson form and deleted assignment
  },

  onLoad: function (options) {
    console.log("global data setting!!! ")
    console.log(app.globalData)
    // this.setData({ is_teacher: app.globalData.is_teacher })
    var that = this
    var id = that.data.lesson_id
    var openId = app.globalData.open_id
    var authToken = app.globalData.authentication_token
    var domain = app.globalData.prod_domain
    var lesson_id = options.lesson
    var endpoint = `${domain}/api/v1/lessons/${lesson_id}`
    // debugger
    wx.request({
      url: endpoint,
      data: {
        user_open_id: openId,
        user_token: authToken
      },
      success: function (res) {
        // res contains all the HTTP request data
        console.log('success!' + res.statusCode);
        let lesson = res.data
        console.log(lesson);
        console.log(lesson.assignment.id);
        // Update local data storage
        that.setData({
          lesson: lesson
        })
      },
      fail: function (res) {
        console.log("loading complications")
        console.log('failed!' + res.statusCode);
      }
    })

  },

  saveLesson: function (e) {

    var that = this
    // put: lessons/lesson_id
    // data: submission_voice: student_recording_path
    // data: grading_voice: teacher_recording_path
    console.log("saving lesson!!!")
    let domain = app.globalData.prod_domain
    var openId = app.globalData.open_id
    var authToken = app.globalData.authentication_token
    var qiniuUpToken = that.data.qiniuUpToken
    var qiniuKey = that.data.qiniuKey

    qiniuUploader.upload(that.data.student_recording_path, (res) => {
      //Uploaded student recording
      console.log(res);
      that.setData({uploaded_student_rec_path: res.voiceURL})

      if (that.data.teacher_recording_path != null) {
        qiniuUploader.upload(teacher_recording_path, (res) => {
          //Uploaded student and teacher recording

          console.log(res);
          that.setData({uploaded_teacher_rec_path: res.voiceURL})

          wx.request({
            url: `${domain}/api/v1/lessons/${that.data.lesson_id}`,
            method: 'PUT',
            data: {
              user_open_id: openId,
              user_token: authToken,
              submission_voice: this.data.uploaded_student_rec_path,
              grading_voice: this.data.uploaded_teacher_rec_path
            },
            success: function (response){
              let res = response.data;
              console.log(res)
            },
            fail: function (res) {
              console.log('shouldnt be here');
              console.log('failed!' + res.statusCode);
            }
          })

          }, (error) => {
            console.error('error: ' + JSON.stringify(error));
          },
          {
            // can the var qiniuKey be passed in as such??
            region: 'ECN',
            uptoken: `${qiniuUpToken}`,
            domain: 'http://p0hdqjyyy.bkt.clouddn.com',
            shouldUseQiniuFileName: false,
            key: `${qiniuKey}`
          }
        );
      } else {
        console.log("!RIGHT HERE!")
        console.log(this.data.lesson.id)
        wx.request({
          url: `${domain}/api/v1/lessons/${this.data.lesson.id}`,
          method: 'PUT',
          data: {
            user_open_id: openId,
            user_token: authToken,
            submission_voice: this.data.uploaded_student_rec_path
          },
          success: function (response){
            let res = response.data;
            console.log(res)
          },
          fail: function (res) {
            console.log("right here!!");
            console.log('failed!' + res.statusCode);
          }
        })

      }

    }, (error) => {
      console.log(error)
      console.error('error: ' + JSON.stringify(error));
    },
    {
      // can the var qiniuKey be passed in as such??
      region: 'ECN',
      uptoken: `${qiniuUpToken}`,
      domain: 'http://p0hdqjyyy.bkt.clouddn.com',
      shouldUseQiniuFileName: false,
      key: `${qiniuKey}`
    }
    );

  }
})
