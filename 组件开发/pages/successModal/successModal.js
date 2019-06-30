// pages/successModal/successModal.js
Component({
  /**
  * 组件的属性列表
  */
  properties: {
    showBgpack:{
    type: Boolean,
    value: false

    },
    showPhonepack:{
      type: Boolean,
      value: false
    }
  },
  /**
     * 组件的初始数据
     */
  data: {
    showBgpack:false,
    showPhonepack:false
  },
  /**
  * 组件的方法列表
  */
  methods: {
  cancelTip(){
    this.setData({
      showBgpack: false,
      showPhonepack:false
    })

    },
     getPhoneNumber(e) {
       let that = this
       that.setData({ showPhonepack: false })
       if (e.detail.errMsg == 'getPhoneNumber:ok') {
         let promise = {
           encryptedData: e.detail.encryptedData,
           iv: e.detail.iv,
           sessionKey: app.globalData.sessionKey,
           openID: app.globalData.openid,
           appid: appid
         }
         that.setData({ showBindUserInfo: false })
       } else {
         that.setData({ showPhonepack: true })
         let wxDetailUserInfo = wx.getStorageSync("wxDetailUserInfo") || {}
         wxDetailUserInfo.wxPhoneNumber = ''
         wx.setStorageSync('wxDetailUserInfo', wxDetailUserInfo)
       }
    },
    onGotUserInfo(e){
      let index=333
      this.triggerEvent('ok', {index });
        // if (!e.detail.userInfo) {
        //   return
        // }
        // wx.setStorageSync('wxUserInfo', e.detail.userInfo)
        // this.setData({
        //   showBgpack: false,
        //   showPhonepack: true
        // })
    }

  }
})