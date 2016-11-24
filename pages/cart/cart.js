Page({
  data:{
    data:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this=this;
    console.log(options)
    wx.request({
      url: 'http://localhost:8080/shopCart',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        if(res.data.iRet==1){
            var data=res.data.data;
            var goods_id=options.goods_id;
            var total_price=0;
            if(!goods_id){
                data.allChoose=false;
                data.goods.forEach((n,i)=>{
                    n.isChoose=false;
                    n.sell_price_f=n.sell_price.split('.')[0];
                    n.sell_price_a=n.sell_price.split('.')[1];
                    if(n.isChoose==true){
                        total_price+=n.sell_total;
                    }else{
                        total_price=0;
                    }
                });
                data.total_price=total_price;
            }else{
                if(data.goods.length>0){
                    data.allChoose=false;
                }else{
                    data.allChoose=true;
                }
                data.goods.forEach((n,i)=>{
                    if(n.goods_id==goods_id){
                        n.isChoose=true;
                        total_price+=n.sell_total;
                    }else{
                        n.isChoose=false;
                    }
                    n.sell_price_f=n.sell_price.split('.')[0];
                    n.sell_price_a=n.sell_price.split('.')[1];
                    data.total_price=total_price;
                });
            }   
            _this.setData({
                data:data
            }); 
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
        wx.showModal({
            title:'温馨提示',
            content:'网络繁忙稍后再试',
            showCancel:false,
        })
      },
      complete: function() {
        // complete
      }
    })
  },
  handleChoose:function(e){
      var goods_id=e.currentTarget.dataset.goods_id;
      var data=this.data.data;
      var total_price=data.total_price;
      var allChooseArr=[];
      data.goods.forEach((n,i)=>{
          if(n.goods_id==goods_id){
              n.isChoose=!n.isChoose;
              if(n.isChoose==true){
                  total_price+=n.sell_total;
              }else{
                  total_price-=n.sell_total;  
              }
          }
          if(n.isChoose==false){
              allChooseArr.push(n);
          } 
      });
      data.total_price=total_price;
      if(allChooseArr.length>0){
          data.allChoose=false;
      }else{
          data.allChoose=true;
      }
      this.setData({
          data:data
      })
  },
  handleAllChoose:function(){
      var data=this.data.data;
      var total_price=0;
      if(data.allChoose==false){
          data.allChoose=true;
          data.goods.forEach((n,i)=>{
             n.isChoose=true; 
             total_price+=n.sell_total;
          });
          data.total_price=total_price;
      }else{
          data.allChoose=false;
          data.total_price=0;
          data.goods.forEach((n,i)=>{
             n.isChoose=false; 
          });
      }
      this.setData({
          data:data
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

    // wx.showModal({
    //     title:'温馨提示',
    //     content:'只差这一步，就能成为您的专属品了，确定要放弃支付吗？',
    //     cancelText:'去意已决',
    //     confirmText:'容我想想',
    //     success:function(res){
    //         if(!res.confirm){
    //             wx.redirectTo({
    //               url: '../index/index'
    //             })    
    //         }
    //     }
    // })
  }
})