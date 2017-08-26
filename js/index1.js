	
	window.onload = function() {
		search();
		time();
		scrollImg();
	}
	//功能一：搜索宽背景颜色变化
	    var search = function() {
		var banner = document.getElementsByClassName('jd_banner')[0];
		var height = banner.offsetHeight;
		
		document.onscroll = function() {
			var top = document.body.scrollTop;
			if(top > height) {
				document.getElementsByClassName('jd_header_box')[0].style.background = 'rgba(201,21,35,0.8)';
			}
			else {
				var op = top / height;
				document.getElementsByClassName('jd_header_box')[0].style.background = 'rgba(201,21,35,'+op+')';			
			}
		}
	}
	    
	    //功能二：倒计时
	    var time = function() {
	    	var timeBox = document.getElementsByClassName('sk_time')[0];
	    	var timeList = timeBox.getElementsByClassName('num');
	//  	console.log(timeList.length);
	        
	        //定时器
	        var timer ;
	        var times = 4*60*60;
	        timer = setInterval(function() {
	        	times--;
	        	var h = Math.floor(times/(60*60));
	        	var m = Math.floor(times/60%60);
	        	var s = times%60;
	//      	console.log(h+'_'+m+'_'+s);
	          
	          timeList[0].innerHTML = h>10?Math.floor(h/10):0;
	          timeList[1].innerHTML = h%10;
	          
	          timeList[2].innerHTML = m>10?Math.floor(m/10):0;
	          timeList[3].innerHTML = m%10;
	          
	          timeList[4].innerHTML = s>10?Math.floor(s/10):0;
	          timeList[5].innerHTML = s%10;
	        },1000);
	        
	        if(times < 0) {
	        	clearInterval(timer);
	        }
	    }
	    
	    //功能三  轮播图滑动
	    var scrollImg = function() {
		    var banner = document.getElementsByClassName('jd_banner')[0];
		    var width = banner.offsetWidth;
	    	var boxUl = banner.getElementsByTagName('ul')[0];
	    	var pointBox = banner.getElementsByTagName('ul')[1];
	    	var pointList = pointBox.getElementsByTagName('li');
	//  	console.log(pointList.length);
	       
	       //添加滑动效果
	       var addtransition = function() {
	       	  boxUl.style.transition = 'all .3s ease';
	       	  boxUl.style.wekitTransition = 'all .3s ease'; 
	       }
	       //移除滑动效果
	       var removetransition = function() {
	       	  boxUl.style.transition = 'none';
	       	  boxUl.style.wekitTransition = 'none';  
	       }
	         //滑动位置
	       var changetransition = function(t) {
	       	  boxUl.style.transform = 'translateX('+t+'px)';
	       	  boxUl.style.wekittransform = 'translateX('+t+'px)';
	       }
	       
	       var timer ;
	       var index = 1;
	       timer = setInterval(function() {
	        	index++;
	       	    addtransition();
	       	    changetransition(-index*width);
	       },1000);
	       
	         //判断li滑动的张数 添加监听事件
	         boxUl.addEventListener('transitionend',function(){
	         	 if(index >= 9) {
	         	index=1;
	            }
	             else if(index <= 0) {
	          	index = 8; 
	           }
	             removetransition();
	             point();
	             changetransition(-index*width);
	         },false);
  
	       //小圆点移动
	       var point = function() {
	       	for(var i=0 ; i < pointList.length;i++) {
	       		pointList[i].className = '';
	       	}
	       	pointList[index-1].className = 'current';
	       }
	       
	       
	       //触摸事件
	       var startX = 0;
	       var moveX = 0;
	       var distanceX = 0;
	       var isMove = false;
	       //触摸时
	       boxUl.addEventListener('touchstart',function(e){
	       	clearInterval(timer);
	       	startX = e.touches[0].clientX;
	       	console.log(startX);
	       });
	       //触摸滑动时
	      boxUl.addEventListener('touchmove',function(e){
	        isMove = true;
	       	moveX = e.touches[0].clientX;
	       	distanceX = moveX-startX;
	       	var currX = -index*width+distanceX;
	       	console.log(currX);
	       	 removetransition();
	       	 changetransition(currX);
	       });
	       //触摸离开时
	       boxUl.addEventListener('touchend',function(e){
             if(isMove && (Math.abs(distanceX)) > width/3) {
             	if(distanceX > 0) {
             		index--;
             	}
             	else {
             		index++;
             	}
             	addtransition();
             	changetransition(-index*width);
             }
             //吸附效果
              else {
              	addtransition();
             	changetransition(-index*width);
              }
              
             
	       	clearInterval(timer);
             timer = setInterval(function(){
             	index++;
             	addtransition();
             	changetransition(-index*width);
             },1000);
	       });
	    }
	    
