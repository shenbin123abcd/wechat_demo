Page({
  data:{
    data:null,
    isFavor:false,
    videoData:null,

    shopCart:false,
    buy:false,
    ifShowModal:false,
    animationData:[],
    scroll_height:'',
    modal_height:'',
    shop_cart:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id=options.id;
    var _this=this;
    wx.getSystemInfo({
      success: function(res) {
        if(res.windowHeight<=526){
            console.log(res)
            _this.setData({
               scroll_height:120 ,
               modal_height:405
            })
        }else{
            _this.setData({
               scroll_height:152 ,
               modal_height:437
            })
        }
      }
    })
    wx.request({
      url: 'http://localhost:8080/detail',
      data: {
        id:id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        if(res.data.iRet==1){
            var videoData=res.data.data.video; 
            var windowHeight,windowWidth='';
            wx.getSystemInfo({
                success: function(res) {
                    windowHeight=res.windowHeight,
                    windowWidth=res.windowWidth
                }
            });
            videoData.forEach((n,i)=>{
                n.isPlay=false;
            });
            res.data.data.content.forEach((n,i)=>{
                n.styleHeight=windowWidth*n.height/n.width
            })
            res.data.data.sell_price_round= res.data.data.sell_price.split('.')[0];
            res.data.data.sell_price_decimal= res.data.data.sell_price.split('.')[1];
            _this.setData({
                data:res.data.data,
                videoData:videoData
            })
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
  },
  handleLink:function(){
      wx.navigateTo({
        url: '../cart/cart'
      })
  },
  handlePlayVideo(e){
      var type=e.currentTarget.dataset.type;
      var newVideoData=this.data.videoData;
      newVideoData.forEach((n,i)=>{
          if(n.type==type){
              n.isPlay=true;
          }else{
              n.isPlay=false;
          }
      });
      this.setData({
          videoData:newVideoData
      })
  },
  handleBuy:function(e){
      var goods_id=e.currentTarget.dataset.id;
      wx.navigateTo({
        url:`../cart/cart?goods_id=${goods_id}`
      })
  },
  handleFavor:function(){
      this.setData({
          isFavor:!this.data.isFavor
      });
      var title=this.data.isFavor?'收藏成功':"取消成功";
      wx.showToast({
          title:title,
          icon:'success',
          duration:500
      })
  },
  handleIntoCart:function(){
      this.closeModal();
      if(!this.data.shop_cart){
          this.setData({
              shop_cart:1
          });
          wx.showToast({
              title:"添加成功",
              icon:"success",
              duration:500
          })
      }else{
          wx.showModal({
              title:'温馨提示',
              content:"您已经添加成功，不能重复添加",
              showCancel:false,
          })
      }
      
  },
  handleModalOpen:function(e){
      var type=e.currentTarget.dataset.type;
      var _this=this;
      var animation=wx.createAnimation({
        duration: 400,
        timingFunction: 'ease', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
        delay: 0,
        transformOrigin: '50% 50%',
      });
      if(type=="shopCart"){
        this.setData({
            ifShowModal:true,
            shopCart:true,
            buy:false,  
        });
      }else if(type=='buy'){
            this.setData({
                ifShowModal:true,
                shopCart:false,
                buy:true
            })
      }
      animation.translateY(-Number(_this.data.modal_height)).step();
      setTimeout(function(){
            _this.setData({
                animationData:animation.export()
            })
      },50); 
  },
  closeModal:function(){
      var _this=this;
      var animation=wx.createAnimation({
        duration: 400,
        timingFunction: 'ease-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
        delay: 0,
        transformOrigin: '50% 50%',
      });
      animation.translateY(_this.data.modal_height).step();
      this.setData({
          animationData:animation.export()
      });
      setTimeout(function(){
            _this.setData({
                ifShowModal:false
            })
      },300);
  },

  onReady:function(){
    // 页面渲染完成
    this.setData({
        shopCart:false,
        buy:false,
        ifShowModal:false,
        animationData:[],
    })
  },
  onShow:function(){
    // 页面显示
    //this.animation=animation;
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  }
})