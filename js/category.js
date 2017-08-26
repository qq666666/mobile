

window.onload = function() {
	scrollLeft();
}

var scrollLeft = function() {
	//找到父容器
	var leftBox = document.getElementsByClassName('category_left')[0];
	 //找到子容器
	var childBox = leftBox.getElementsByTagName('ul')[0];
	 //点击滑动左分类栏
	var liBox = childBox.getElementsByTagName('li');
	//取到父容器内容的高度
	 var parentH = leftBox.offsetHeight;
//	 减去头部的高度就是内容的高度
	  parentH = parentH - 45;
	 //取到子容器盒子的高度
	 var childH = childBox.offsetHeight;
	 
	 //添加过度效果
	 var addTransition = function() {
	 	childBox.style.transition = 'all .3s ease 0s';
	 	childBox.style.webkitTransition = 'all .3s ease 0s';
	 	
	 }
	 
	  //删除过度效果
	 var removeTransition = function() {
	 	childBox.style.transition = 'none';
	 	childBox.style.webkitTransition = 'none';
	 }
	 
	  //改变位置
	 var changeTransition = function(t) {
	 	childBox.style.transform = 'translateY('+t+'px)';
	 	childBox.style.webkitTransform = 'translateY('+t+'px)';
	 }
	 //开始的Y坐标
	 var startY = 0 ;
	 //结束的Y坐标
	 var endY = 0;
	 //滑动的距离
	 var moveY = 0;
//	 当前translateY的值
	 var currY = 0;
	//滑动的时候限制的最大滑动距离和最小滑动距离
    var maxY = 150;
    //childH - parentH超出的高度
    var minY = -(childH - parentH + 150);
	 var startTime = 0;
	 var endTime = 0;
	 //触摸屏幕时
	childBox.addEventListener('touchstart',function(e) {
		startTime = new Date().getTime();
		startY = e.touches[0].clientY;
//		console.log(e);
	},false);
	
	//移动屏幕时
	childBox.addEventListener('touchmove',function(e) {
		e.preventDefault();
		endY = e.touches[0].clientY;
		moveY = startY - endY;
		//上下的距离不大于某一个值时
		if((currY-moveY) <= maxY && (currY-moveY) >= minY) {
			removeTransition();
			//改变位置
		   changeTransition(currY-moveY);
		}
		
	},false);
	
	//离开屏幕时
	childBox.addEventListener('touchend',function(e) {
		//当前的滑动位置
		currY = currY - moveY;
//         上面的吸附效果
         if((currY - moveY)>=0) {
         	addTransition();
			//改变位置
		   changeTransition(0);
		   currY = 0;
         }
//         下面的吸附效果
         else if((currY - moveY)<=-(childH - parentH)) {
         	addTransition();
			//改变位置
		   changeTransition(-(childH - parentH));
		   currY = -(childH - parentH);
         }
         
         else {
         	currY = currY-moveY;
         	startY = 0;
         	moveY = 0;
         	endY = 0;
         	currY = 0;
         }
	  //点击  滑动到顶部  改变当前的样式   当滑动到底部的时候不需要做定位  tap*/
       endTime = new Date().getTime();
//     console.log(moveY+"==="+(endTime-startTime));
       if(endTime - startTime <150 && moveY == 0) {
       	for(var i = 0 ; i < liBox.length;i++) {
       		liBox[i].className = '';
       		liBox[i].index = i;
       	}
       	var li = e.target.parentNode;
       	  li.className = 'current';
       	  //移动的距离
       	  var translateY = li.index*50;
       	  if(translateY < childH - parentH) {
       	  	addTransition();
       	  	changeTransition(- translateY);
       	  	currY = - translateY;
       	  }
       	  else {
       	  	addTransition();
       	  	changeTransition(-(childH - parentH));
       	  	currY = -(childH - parentH);
       	  }
       }         
	},false);
	
}
