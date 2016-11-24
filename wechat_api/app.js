var express=require('express');
var app=express();
var bodyParser=require('body-parser');

//fake data
var indexData=require('./staticData/index');
var detailData=require('./staticData/detail');
var userData=require('./staticData/user');
var cartData=require('./staticData/cart');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.post('/login',(req,res,next)=>{
	if(req.body){
		if(req.body.password==123456){
			setTimeout(()=>{
				res.json({
					iRet:1,
					data:{
						token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidWlkIjoxLCJ1c2VybmFtZSI6ImhlaGVoZSIsInBob25lIjoiMTg2MTYwODMzMjIiLCJyZWdpb24iOnsibmFtZSI6Ilx1NGUwYVx1NmQ3N1x1NWUwMlx0XHU5NWY4XHU1MzE3XHU1MzNhIiwiaWQiOjc5OX0sImdyb3VwIjoiYWxsIiwiZXhwIjoxNDgxNjg3OTAxfQ.UWyZbgbMzKD-nP7EVZdyTsfQoaYywfi0NyCJ6TBEeY8'
					},
					info:"登录成功",
				})	
			},300);
		}else{
			setTimeout(()=>{
				res.json({
					iRet:0,
					data:'',
					info:'密码或者手机号错误',

				})
			},300);
		}
	}else{
		res.json({
			iRet:0,
			data:'',
			info:'信息不完整重新填写',
		})
	}
});

app.post("/",(req,res,next)=>{
	var page=req.body.page;
	if(page==1){
		setTimeout(function(){
			var data=indexData.renderPage1();
			res.json(data);
		},0);
	}else if(page==2){
		setTimeout(function(){
			var data=indexData.renderPage2();
			res.json(data);
		},1300);
	}else if(page==3){
		setTimeout(function(){
			var data=indexData.renderPage3();
			res.json(data);
		},1300)
	}else{
		res.json({
			iRet:0,
			data:'',
			info:'网络繁忙稍后再试',
		})
	}
})

app.post("/detail",(req,res,next)=>{
	var page=req.body.page;
	setTimeout(function(){
		var data=detailData.renderPage();
		res.json(data);
	},1300)
});

app.post("/user",(req,res,next)=>{
	setTimeout(()=>{
		var data=userData.sendData();
		res.json(data);
	},1300)
});

app.post('/shopCart',(req,res,next)=>{
	setTimeout(()=>{
		var data=cartData.sendData();
		res.json(data);
	},1300)
})



app.listen(8080,function(){
	console.log('server start port 8080');
})