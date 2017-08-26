
window.onload = function() {
	checked();
	 deleteBox();
}

//复选框
var checked = function() {
	//获取复选框对象数组
	var checked = document.getElementsByClassName('checkBox');
//	console.log(checked.length);
    for(var i = 0 ; i < checked.length;i++) {
    	checked[i].onclick = function() {
    		//没有默认为空
    		var hasChecked = this.getAttribute('checked');
    		//判断有没有checked
    		if(hasChecked != null) {
    			this.removeAttribute('checked');
    		}
    		else {
    			this.setAttribute('checked','');
    		}
    	}
    }
}

//删除按钮
 var deleteBox = function() {
 	//获取删除对象
 	var del_box = document.getElementsByClassName('del_box');
// 	console.log(del_box.length);
 	//获取mask对象
 	var mask = document.getElementsByClassName('mask')[0];
 	//获取盒子对象
 	var mask_box = document.getElementsByClassName('mask_box')[0];
 	//获取确定对象
 	 var submit = document.getElementsByClassName('submit')[0];
 	 //获取取消对象
 	 var cancel = document.getElementsByClassName('cancel')[0];
 	 //全局变量
 	 var top ;
       //点击删除按钮
      for(var i = 0 ; i < del_box.length;i++) {
      	del_box[i].onclick = function() {
      		mask.style.display = 'block';
      		mask_box.className = 'mask_box bounceInDown';
      		
      		//当前点击的this给deleteOpj
      		var deleteOpj = this;
      		
      		 top = deleteOpj.getElementsByClassName('del_box_top')[0];
      		console.log(top);
      		
      			top.style.transition = 'all 1s ease 0s';
      			top.style.webkitTransition = 'all 1s ease 0s';
      			
      			top.style.transform = 'translateY(-5px) translateX(-2px) rotate(-45deg)';
      			top.style.webkitTransform = 'translateY(-5px) translateX(-2px) rotate(-45deg)';
      			
      		
      	}
      }
      //确定按钮
      submit.onclick = function() {
      	mask.style.display = 'none';
      	mask_box.className = 'mask_box';
      	//如果有top，说明有点击删除按钮
      	if(top) {
      		top.style.transform = 'translateY(0) translateX(0) rotate(0deg)';
      		top.style.webkitTransform = 'translateY(0) translateX(0) rotate(0deg)';
      	}
      	
      }
      //取消按钮
         cancel.onclick = function() {
      	mask.style.display = 'none';
      	mask_box.className = 'mask_box';
      	if(top) {
      		top.style.transform = 'translateY(0) translateX(0) rotate(0deg)';
      		top.style.webkitTransform = 'translateY(0) translateX(0) rotate(0deg)';
      	}
      	
      }
      
 }
