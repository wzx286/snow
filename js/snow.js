var MyCanvas={
			ctx:null,
			totalCount:150,
			snowArr:[],
			init:function(){
				canvas.setAttribute("width",document.body.clientWidth);
				canvas.setAttribute("height",document.body.clientHeight);		
				this.ctx=canvas.getContext('2d');
				this.ctx.fillStyle="#000";
				this.ctx.fillRect(0,0,document.body.clientWidth,document.body.clientHeight);
				this.ctx.shadowOffsetX = 0; // 阴影设置
				this.ctx.shadowOffsetY = 0;
				this.ctx.shadowBlur = 8; 
				this.ctx.shadowColor = "rgba(255,255,255,0.5)"; 
			},
			createSnow:function(){
				for(let i=0;i<this.totalCount;i++){
					var snow={};
					this.initSnow(snow);
					this.snowArr.push(snow);
				}
			},
			initSnow:function(snow){
				this.getSpeed(snow);
				snow.y=Math.random()*canvas.height;
			},
			getSpeed:function(snow){
				snow.r=Math.random()*6;
				snow.speedx=Math.random()*2-1;
				snow.speedy=Math.random()*1+2;
				snow.x=Math.random()*canvas.width*2-canvas.width;
				snow.y=0;
				snow.color="hsla(100,0%,"+(Math.ceil(Math.random()*30)+70)+"%,"+(Math.random()*0.3+0.7)+")";//"+Math.ceil(Math.random()*100)+"
			},
			refresh:function(arr){
				this.ctx.fillStyle="#000";			
				this.ctx.fillRect(0,0,canvas.width,canvas.height);
				this.ctx.fillStyle="transparent";			
				this.ctx.fillRect(0,0,canvas.width,canvas.height);
				let len=arr.length;
				for(let i=0;i<len;i++){
					arr[i].x+=arr[i].speedx;
					arr[i].y+=arr[i].speedy;
					// arr[i].speedx*=0.99;
					if(arr[i].x<-canvas.width||arr[i].x>2*canvas.width||arr[i].y<0||arr[i].y>canvas.height||(arr[i].speedx==0&&arr[i].speedy==0)){
						var newSnow={};
						arr.splice(i,1);						
						this.getSpeed(newSnow);
						arr.push(newSnow);
					}
				}
			},
			drawSnow:function(arr){
				var len=arr.length;
				for(var i=len-1;i>=0;i--){
					this.ctx.beginPath();				
					this.ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,Math.PI*2,true);
					this.ctx.fillStyle=arr[i].color;
					this.ctx.closePath();
					this.ctx.fill();
				}
			},
			loop:function(){				
				this.refresh(this.snowArr);
				this.drawSnow(this.snowArr);
			},
			run:function(){
				this.init();
				this.createSnow();
			}
		}


function showSnow(){
	MyCanvas.init();
	MyCanvas.createSnow();
	var requestAnimationFrame = window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||window.oCancelAnimationFrame;
	if(!requestAnimationFrame||!cancelAnimationFrame){//如果浏览器不支持requestAnimationFrame
		setInterval(function(){
			MyCanvas.loop();
		},1000/60);
	}
	else {
		// window.requestAnimationFrame=requestAnimationFrame;
		// window.cancelAnimationFrame=requestAnimationFrame;
		var sloop=function(){
			MyCanvas.loop();
			requestAnimationFrame(sloop);
		}
		requestAnimationFrame(sloop);
	}
}

showSnow();