

// // pages/assignments/assignments.js
// Page({
//   data: {
//     assignment: null,
//     content: null,
//     voice: null
//   },

//   onLoad: function (options) {
//     var that = this
//     var id = 1
//     var endpoint = `https://english-go.herokuapp.com/api/v1/assignments/#{id}`
//     const options = {
//       duration: 200000,
//       sampleRate: 44100,
//       numberOfChannels: 1,
//       encodeBitRate: 192000,
//       format: 'aac',
//       frameSize: 50
//     }
//     const recorderManager = wx.getRecorderManager(options)
//     wx.request({
//       url: endpoint,
//       header: { 'content-type': 'application/json' },
//       success: function (res) {
//         // res contains all the HTTP request data
//         console.log('success!' + res.statusCode);
//         console.log(res.data);
//         // Update local data storage
//         let assign = res.data
//         that.setData({
//            content: assign.content,
//            voice: assign.voice
//         })
//       },
//       fail: function (res) {
//         console.log(res.data);
//         console.log('failed!' + res.statusCode);
//       },
//       complete: function (res) {
//         console.log(res.data);
//         console.log('completed!' + res.statusCode);
//       }
//     }),

//     recorderManager.onStart(() => {
//       console.log('recorder start')
//     })
//     recorderManager.onResume(() => {
//       console.log('recorder resume')
//     })
//     recorderManager.onPause(() => {
//       console.log('recorder pause')
//     })
//     recorderManager.onStop((res) => {
//       console.log('recorder stop', res)
//       const { tempFilePath } = res
//     })
//     recorderManager.onFrameRecorded((res) => {
//       const { frameBuffer } = res
//       console.log('frameBuffer.byteLength', frameBuffer.byteLength)
//     })

//     recorderManager.start(options)
//   },

//   onReady: function () {

//   },


//   onShow: function () {

//   },


//   onHide: function () {

//   },

//   onUnload: function () {

//   },


//   onPullDownRefresh: function () {

//   },

//   onReachBottom: function () {

//   },

//   onShareAppMessage: function () {

//   }
// })

