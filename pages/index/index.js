//index.js
//获取应用实例
var app = getApp();
var util=require("../../utils/util.js");

function countDown(_this,start_time){
    var fn=util.timeOut(start_time);
    var time=setTimeout(function(){
        _this.setData({
          d:fn.d,
          h:fn.h,
          m:fn.m,
          s:fn.s
        });
        countDown(_this,start_time);
    },1000);

}

Page({
  data:{
    pageData:null,
    page:1,
    total:1,
    window_height:null,
    start_time:null,
    d:null,
    h:null,
    m:null,
    s:null,
    isLoading:false,
    scroll:false,
    scroll_top:null,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this=this;
    var token = wx.getStorageSync('hb_shop_token');
      if(token){
        wx.getSystemInfo({
          success: function(res) {
            _this.setData({
                window_height: res.windowHeight,
            })
          }
        })
        wx.request({
          url: 'http://localhost:8080/',
          data: {
            page:this.data.page
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.iRet==1){
              var start_time=Number(res.data.data.start_time)*1000;
              _this.setData({
                  pageData:res.data.data,
                  total:res.data.data.total,
                  start_time:start_time,
                  page:_this.data.page+1,
                  total:res.data.data.total,
              });    
              countDown(_this,start_time);
            }  
          }
        });
      }else{
        wx.redirectTo({
          url: "../login/login"
        })
      }  
  },
  handleScroll(e){
    var _this=this;
    wx.getSystemInfo({
      success: function(res) {
        var window_height=res.windowHeight;
        if(e.detail.scrollTop>=window_height){
            _this.setData({
              scroll:true,
              scroll_top:e.detail.scrollTop
            });
        }else{
            _this.setData({
                scroll:false
            });
        }
      }
    })
  },
  handleBackTop(){
    this.setData({
      scroll_top:0
    })
  },
  handleLink:function(e){
    var url=e.currentTarget.dataset.url;
    if(url=='user'){
        wx.navigateTo({
          url: '../user/user',
        });
    }else{
        wx.navigateTo({
          url: '../cart/cart',
        });
    }
    
  },
  handleLower:function(e){
    var _this=this;
    if(this.data.page<=this.data.total){
        _this.setData({
          isLoading:true,
        })
        wx.request({
          url: 'http://localhost:8080/',
          data: {
            page:this.data.page
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.iRet==1){
              var newData={};
              var data=_this.data.pageData;
              for(var key in data){
                newData[key]=data[key]
                if(key=='list'){
                  newData[key]=data[key].concat(res.data.data.list);
                }
              }
              _this.setData({
                page:_this.data.page+1,
                pageData:newData,
                isLoading:false
              });
              //console.log(_this.data);
            }else{
              wx.showModal({
                  title:'温馨提示',
                  content:res.data.info,
                  showCancel:false,
              })
            }
          },
        })
    }

  },
  onReady:function(){
    //页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  }
})