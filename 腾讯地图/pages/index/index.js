//index.js
//获取应用实例
const app = getApp()
const txMap = require("../../utils/qqmap-wx-jssdk.min.js");
import mapKey from '../../http/mapKey.js'
const wxMap = new txMap({
  key: mapKey
});

Page({
  data: {
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }],
    cityInfo: {
      latitude: 23.099994,
      longitude: 113.324520,
    },
    showBgpack: false,
    showPhonepack: false,
    showIfView: false,
  },

  onLoad: function () {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation'] && wx.getStorageSync("cityInfo")) {
          that.getMapLocations()

        } else if (res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation']) {
          that.setData({
            showIfView: true,
          })
        } else {
          that.setData({
            showIfView: false,
          })
        }
      }
    })
  },
  //地址点击
  bindaddress(e) {
    let that = this;
    debugger
    wx.getSetting({ //获取用户当前的授权状态
      success(res) {
        debugger
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({ //提前发起授权请求
            scope: 'scope.userLocation',
            success(res) {
              debugger
              that.getMapLocation();
            }, fail(res) {
              console.log(res)
            }
          })
        } else {
          that.binduserInfo();
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  //点击地图poi点时触发
  markertap(e) {
    console.log("markertap", e)
  },
  //点击地图poi点时触发
  controltap(e) {
    console.log("controltap", e)
  },
  //点击地图poi点时触发
  callouttap(e) {
    console.log("callouttap", e)
  },
  //点击地图poi点时触发
  regionchange(e) {
    console.log("regionchange", e)
  },
  //点击地图poi点时触发
  poitap(e) {
    console.log("poitap", e)
  },
  maptap(e) {
    // that.data.cityInfo.latitude
    // that.data.cityInfo.longitude
    // wx.setStorageSync("cityInfo", that.data.cityInfo)
    console.log("maptap", e)
  },
  // 获取微信用户信息
  onGotUserInfo(e) {
    if (!e.detail.userInfo) {
      return
    }
    console.log(e)
    wx.setStorageSync('wxUserInfo', e.detail.userInfo)
    this.setData({
      showBgpack: false,
      showPhonepack: true
    })
  },
  //获取手机号
  getPhoneNumber(e) {
    let that = this
    that.setData({
      showPhonepack: false
    })
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      that.setData({
        showPhonepack: false
      })
    } else {
      that.setData({
        showPhonepack: true
      })
      let wxDetailUserInfo = wx.getStorageSync("wxDetailUserInfo") || {}
      wxDetailUserInfo.wxPhoneNumber = ''
      wx.setStorageSync('wxDetailUserInfo', wxDetailUserInfo)
    }
  },


  //绑定用户信息
  binduserInfo() {
    let that = this;
    debugger
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            showBgpack: true,
            showPhonepack: false
          })
          that.getMapLocation()
        } else if (!res.authSetting['scope.userLocation']) {
          that.setData({
            showBgpack: false,
            showPhonepack: true
          });
        } else {
          that.getMapLocation()
        }
      }
    })
  },

  getMapLocations() {
    let that = this;
    debugger
    //经纬度逆解析获取城市名
    wxMap.reverseGeocoder({
      location: {
        latitude: that.data.cityInfo.latitude,
        longitude: that.data.cityInfo.longitude
      },
      success: function (res) {
        that.setData({ cityInfo: that.data.cityInfo, showIfView: true, })

        wx.setStorageSync("cityName", res)
        wx.setStorageSync("cityInfo", that.data.cityInfo)
        console.log(res)
      },
      fail: function (res) {
        console.log("1232")
      },
    })
  },
  //用户地点信息
  getMapLocation() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.data.cityInfo.latitude = res.latitude.toString()
        that.data.cityInfo.longitude = res.longitude.toString()
        //经纬度逆解析获取城市名
        wxMap.reverseGeocoder({
          location: {
            latitude: that.data.cityInfo.latitude,
            longitude: that.data.cityInfo.longitude
          },
          success: function (res) {
            that.setData({ cityInfo: that.data.cityInfo, showIfView: true, })

            wx.setStorageSync("cityName", res)
            wx.setStorageSync("cityInfo", that.data.cityInfo)
            console.log(res)
          },
          fail: function (res) {
            console.log("1232")
          },
        })
      },
      fail: function (res) {
        console.log("1232")
      },

    })

  }
})