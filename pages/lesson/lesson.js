const qiniuUploader = require("../../utils/qiniuUploader.js");

var filePath;
var app = getApp()

Page({
  data: {
    assignment: null,
    content: null,
    voice: null,
    lesson: null,
    recording_path: null,
    storage_path: null,
    storage_key: null,
    storage_hash: null,
    qiniuUpToken: null,
    qiniuKey: null,
    userInfo: {},
    is_recording: false
  },

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

  buttonClicked: function() {
    let is_recording = this.data.is_recording
    console.log("recording?" + is_recording)
    if (is_recording) {
      this.stopRecording()
    } else {
      this.startRecording()
    }

    this.setData({ is_recording: !is_recording })

  },

  startRecording: function () {
    var that = this
    wx.startRecord({
      success: function (res) {
        that.setData({
          recording_path: res.tempFilePath
        })
        console.log(that.data.recording_path)
        setTimeout(function () {
          wx.pauseVoice()
        }, 200000)
      }
    })
  },
  stopRecording: function () {
      wx.stopRecord()
  },
  playRecording: function () {
    wx.playVoice({
      filePath: that.data.recording_path,
      complete: function () {
      }
    })
  },
////////////////////////////////////////////////////
  playButtonClicked: function () {
    let is_playing = this.data.is_playing
    console.log("playing?" + is_playing)
    if (is_playing) {
      this.startPlaying()
    } else {
      this.startPlaying()
    }

    this.setData({ is_playing: !is_playing })

  },

  uploadVoice: function() {
    var that = this
    var filePath = that.data.recording_path
    // not sure if this is the best way for this to work dynamically
    var qiniuUpToken = that.data.qiniuUpToken
    var qiniuKey = that.data.qiniuKey

    qiniuUploader.upload(filePath, (res) => {
      console.log(res);
      that.setData({
        storage_path: res.voiceUrl,
        storage_key: res.key,
        storage_hash: res.hash
      });
    }, (error) => {
      console.error('error: ' + JSON.stringify(error));
    },
    {
      // can the var qiniuKey be passed in as such??
      region: 'ECN',
      uptoken: `${qiniuUpToken}`
      domain: 'http://p0hdqjyyy.bkt.clouddn.com',
      shouldUseQiniuFileName: false,
      key: `${qiniuKey}`
    }
    );
  },

  downloadVoice: function (){
    wx.downloadFile({
    url: 'http://p0hdqjyyy.bkt.clouddn.com/thebestvoice.silk',
    // `http://p0hdqjyyy.bkt.clouddn.com${subKey}`, //仅为示例，并非真实的资源
    success: function(res) {

        if (res.statusCode === 200) {
            wx.playVoice({
              filePath: res.tempFilePath
          })
        }
      }
    })
  },
  onReady: function () {
    wx.request({
      url: `${domain}/api/v1/file_upload`
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
        initQiniu();
      },
      fail: function (res) {
        console.log('failed!' + res.statusCode);
      },
    })
  },

  onLoad: function (options) {
    console.log(options)
    var that = this
    var id = options.assignment
    that.setData({
      lesson_id: options.lesson
    })
    var openId = app.globalData.open_id
    var authToken = app.globalData.authentication_token
    var domain = app.globalData.dev_domain
    var endpoint = `${domain}/api/v1/assignments/${id}`
    wx.request({
      url: endpoint,
      data: {
        user_open_id: openId,
        user_token: authToken
      },
      success: function (res) {
        // res contains all the HTTP request data
        console.log('success!' + res.statusCode);
        console.log(res.data);
        // Update local data storage
        let assignment = res.data
        that.setData({
           content: assignment.content,
           voice: assignment.voice
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

  bindSubmission: function(event){
    var that = this
    //  var assignmentId = that.assignment
    var lessonId = that.data.lesson_id
    var openId = app.globalData.open_id
    var authToken = app.globalData.authentication_token
    var voice_submission = that.data.storage_path
    var voice_key = that.data.storage_key
    var domain = app.globalData.dev_domain

    that.uploadVoice()

    wx.request({
      method: 'POST',
      url: `${domain}/api/v1/submissions`,
      data: {
        user_open_id: openId,
        user_token: authToken,
        lesson_id: lessonId,
        submission: {
          voice: voice_submission,
          content: voice_key
        }
      },
      success: function (response){
        let res = response.data;
        console.log(res)
      },
      fail: function (res) {
        console.log(res.data);
        console.log('failed!' + res.statusCode);
      }
    })


    wx.showToast({
      title: 'Sending :P',
      icon: 'loading',
      duration: 1500
    })

    wx.reLaunch({
      url: '/pages/index/index?form=1'
    })
  }
})
