window.onload = function() {
	search();
	secondKill();
	scrollPic();
}

//功能一：搜索框背景颜色的变化
var search = function() {
	//获取搜索框颜色对象
	var search = document.getElementsByClassName('jd_header_box')[0];
	//获取轮播图对象
	var banner = document.getElementsByClassName('jd_banner')[0];
     //获取轮播图的高度
     var height = banner.offsetHeight;
    window.onscroll = function() {
    //获取滚动的高度
    	var top = document.body.scrollTop;
    	if(top > height) {
    		search.style.background = 'rgba(201,21,35,0.85)';
    	}
    	else {
    		//成比例的显示颜色
    		var op = top / height * 0.85;
    		search.style.background = "rgba(201,21,35,"+op+")";
    	}
    }
}

//功能二：倒计时
 var secondKill = function() {
 	//获取倒计时父盒子
 	var parent = document.getElementsByClassName('sk_time')[0];
 	//获取所有倒计时的盒子
 	var timeList = parent.getElementsByClassName('num');
// 	console.log(time.length);

    //设置定时器
    var timer;
    var time = 8*60*60;
     timer = setInterval(function(){
         time--;
         var h = Math.floor(time/(60*60));
         var m = Math.floor(time/60%60);
         var s = time%60;
//       console.log(h+'-'+m+'-'+s);

        //赋值内容
        timeList[0].innerHTML = h>10?Math.floor(h/10):0;
        timeList[1].innerHTML = h%10;
        
        timeList[2].innerHTML = m>10?Math.floor(m/10):0;
        timeList[3].innerHTML = m%10;
        
        timeList[4].innerHTML = s>10?Math.floor(s/10):0;
        timeList[5].innerHTML = s%10;
        if(time < 0) {
        	clearInterval(timer);
        }
     },1000);
 }



//功能三：轮播图滑动效果

var scrollPic = function() {
	//获取轮播图对象
	var banner = document.getElementsByClassName('jd_banner')[0];
	//获取轮播图的宽度
	var width = banner.offsetWidth;
	//获取图片对象
	var imageBox = banner.getElementsByTagName('ul')[0];
	//获取小圆点对象
	var pointBox = banner.getElementsByTagName('ul')[1];
	//获取li数组
	var pointList = pointBox.getElementsByTagName('li');
//	console.log(pointList.length);
	
	//添加过渡效果
	 var addTransition = function() {
	 	imageBox.style.transition = 'all .3s ease 0s';
	 	imageBox.style.webkitTransition = 'all .3s ease 0s';
	 	
	 }
	 
	 //移除过渡效果，为了我们用手滑动时不冲突
	 var removeTransition = function() {
	 	imageBox.style.transition = 'none';
	 	imageBox.style.webkitTransition = 'none';
	 }
	 
	 //设置滑动位置
	 var change = function(t) {
	 	imageBox.style.transform = 'translateX('+t+'px)';
	 	imageBox.style.webkitTransform = 'translateX('+t+'px)';
	 	
	 }
	 //第一张图片
	var index = 1;
	var timer;
	 //1.设置定时器
	 timer = setInterval(function() {
	 	 index++;
	 	 //通过加过度来定位
	 	 addTransition();
	 	 change(-width*index);
	 	
	 },3000);
	 
	 //2.添加监听事件，是判断图片是否超过数量， 第三个参数是默认从里往外冒泡
	 imageBox.addEventListener('transitionEnd',function(){
//	 	console.log('过度完了');
	 	if(index >= 9 ) {
	 		index = 1;
	 	}
	 	else if (index <= 0) {
	 		index = 8;
	 	}
	 	//清除过渡效果
	 	removeTransition();
	 	//设置移动位置
	 	 change(-width*index);
	 	 point();
	 },false);
	 
	 
	 //2.为了考虑老版本浏览器
	  imageBox.addEventListener('webkitTransitionEnd',function(){
//	 	console.log('过度完了');
	 		if(index >= 9 ) {
	 		index = 1;
	 	}
	 	else if (index <= 0) {
	 		index = 8;
	 	}
	 	//清除过渡效果
	 	removeTransition();
	 	//设置移动位置
	 	 change(-width*index);
	 	 point();
	 },false);
	  
	  
	  //3.小圆点随着滚动
	  var point = function() {
	  	for(var i = 0 ; i <pointList.length; i++) {
	  		pointList[i].className = '';
	  	}
	  	//index为1时小圆点在第一个，index为9时，小圆点在第8个  小圆点0-7
	  	pointList[index - 1].className = 'current';
	  }
	  
	  //4.图片触摸滑动效果
	    var startX = 0;
	    var moveX = 0 ;
	    var distanceX = 0;
	    var isMove = false;
	    //触摸屏幕时
	  imageBox.addEventListener('touchstart',function(e) {
	  	//清除定时器
	  	  clearInterval(timer);
	  	   startX = e.touches[0].clientX;
	  	   console.log(startX);
	  });
	  //滑动屏幕时
	   imageBox.addEventListener('touchmove',function(e) {
	   	//等于true
	   	   isMove = true;
	  	   moveX = e.touches[0].clientX;
	  	   //滑动距离  正负值 
	  	    distanceX = moveX - startX; 
	  	   /*算出当前图片盒子需要定位的位子*/
	  	   var currX = -index*width + distanceX;
//	  	   console.log(currX);
//         删除过度动画
	  	   removeTransition();
	  	   //改变位置
	  	   change(currX);
           
	  });
	  //离开屏幕时
	   imageBox.addEventListener('touchend',function(e) {
       //如果有滑动且滑动大于屏幕1/3时，滚动上一张或下一张
	  	  if(isMove &&( Math.abs(distanceX) > width / 3)) {
	  	  	//滚动到上一张
	  	  	   if(distanceX > 0) {
	  	  	   	index--;
	  	  	   }
	  	  	   //滚动到下一张
	  	  	   else {
	  	  	   	index++;
	  	  	   }
	  	  	   //添加滑动效果
	  	  	   addTransition();
	  	  	   //改变位置
	  	  	   change(-index*width);
	  	  }
	  	  //当不超过屏幕1/3时，屏幕吸附效果，不滚动张数
	  	  else {
	  	     	addTransition();
	  	  	   change(-index*width);
	  	  }
	  	  
	  	  //重置
	  	   startX = 0 ; 
	  	   moveX = 0 ;  
	  	   distanceX = 0 ;
	  	   isMove = false;
	  	  //重新添加定时器，否则当滑动屏幕时，定时器不操作
	  	  clearInterval(timer);
	  	  timer = setInterval(function() {
	  	  	//滚动张数
	  	  	index++;
	  	  	//加过度
	  	  	addTransition();
	  	  	//改变位置
	  	  	change(-index*width);
	  	  },3000)
	  });

  
}


