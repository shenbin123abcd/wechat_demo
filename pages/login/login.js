var util=require("../../utils/util.js");

Page({
  data:{
    password:null,
    phone:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  formSubmit:function(value){
    var val=value.detail.value
    this.data.password=val.password;
    this.data.phone=val.phone;
    if(!this.data.phone){
        wx.showModal({
            title:'温馨提示',
            content:'请填写手机号',
            showCancel:false,
        })
    }else if(!util.checkPhone(this.data.phone)){
        wx.showModal({
            title:'温馨提示',
            content:'请填写正确的手机号',
            showCancel:false,
        })
    }else if(!this.data.password){
        wx.showModal({
            title:'温馨提示',
            content:'请填写密码',
            showCancel:false,
        })
    }else{
        //http://shop.halobear.cn/api/public/login
        //http://shopapi-test.halobear.cn/public/login
        wx.showToast({
          title:'正在加载中',
          icon:'loading',
        })
        wx.request({
          url: 'http://localhost:8080/login',
          data: {
              password:Number(this.data.password),
              phone:Number(this.data.phone),
              from:"web"
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function(res){
            // success
            var data=res.data;
            if(data.iRet==1){
                wx.setStorage({
                  key: 'hb_shop_token',
                  data: data.data.token,
                  success: function(res){
                    wx.redirectTo({
                      url:'../../pages/index/index'
                    })
                  },
                })
                
            }else{
               wx.showModal({
                    title:'温馨提示',
                    content:res.data.info,
                    showCancel:false,
                }) 
            } 
          },
          fail: function() {
            // fail
            wx.hideToast();
            wx.showModal({
                title:'温馨提示',
                content:'网络繁忙稍后再试',
                showCancel:false,
            }) 
          },
          complete: function() {
            // complete
            wx.hideToast(); 
          }
        })
    }
  }
})