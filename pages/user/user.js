Page({
  data:{
    res:null,
    list:[
        [
            {
                img:'../../images/user4.png',
                text:'我的订单'
            },{
                img:'../../images/user6.png',
                text:'我的案例'
            },{
                img:'../../images/user7.png',
                text:'我的收藏',
                isBottom:true
            }
        ],
        [
            {
                img:'../../images/user8.png',
                text:'个人账号'
            },{
                img:'../../images/user9.png',
                text:'个人账户',
                isBottom:true
            }
        ],
        [
            {
                img:'../../images/user10.png',
                text:'清除缓存'
            },{
                img:'../../images/user11.png',
                text:'联系客服'
            },{
                img:'../../images/user12.png',
                text:'消息推送'
            },{
                img:'../../images/user13.png',
                text:'关于我们'
            }
        ]

    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this=this; 
    wx.request({
      url: 'http://localhost:8080/user',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(res.data.iRet==1){
            _this.setData({
                res:res.data.data,
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
        wx.showModal({
            title:'温馨提示',
            content:'网络繁忙稍后再试',
            showCancel:false,
        })
      },
    })
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
    
  }
})