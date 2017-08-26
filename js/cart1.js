	
	window.onload = function() {
	   checked();
	   deleteBox();
	}
	//复选框
	var checked = function() {
		var checkBox = document.getElementsByClassName('checkBox');
	//	console.log(checkBox.length);
	    for(var i = 0 ; i < checkBox.length;i++) {
	    	checkBox[i].onclick = function() {
	    		var hasChecked = this.getAttribute('checked');
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
	 	 var del_box = document.getElementsByClassName('del_box');
	 	 var mask = document.getElementsByClassName('mask')[0];
	 	 var mask_box = document.getElementsByClassName('mask_box')[0];
	 	 var submit = document.getElementsByClassName('submit')[0];
	 	 var cancel = document.getElementsByClassName('cancel')[0];
	 	 var top ;
	// 	 console.log(del_box.length);
	     for(var i = 0 ; i <del_box.length;i++) {
	     	del_box[i].onclick = function() {
	     		mask.style.display = 'block';
	     		mask_box.className = 'mask_box bounceInDown';
	     		
	     		var deleteObj = this;
	     		top = deleteObj.getElementsByClassName('del_box_top')[0];
	//   		console.log(top);
	            top.style.transition = 'all 1s ease';
	            top.style.webkitTransition = 'all 1s ease';
	            
	            top.style.transform = 'translateY(-5px) translateX(-2px) rotate(-45deg)';
	            top.style.webkitTransform = 'translateY(-5px) translateX(-2px) rotate(-45deg)';
	            
	            
	     	}
	     }
	    //确定按钮
	     submit.onclick = function() {
	     	    mask.style.display = 'none';
	     		mask_box.className = 'mask_box';
	     		if(top) {
	     			 top.style.transform = 'translateY(0) translateX(0) rotate(0)';
	            top.style.webkitTransform = 'translateY(0) translateX(0) rotate(0)';
	     		}
	     }
	     
	     //取消按钮
	     cancel.onclick = function() {
	         	mask.style.display = 'none';
	     		mask_box.className = 'mask_box';
	     		if(top) {
	     			 top.style.transform = 'translateY(0) translateX(0) rotate(0)';
	            top.style.webkitTransform = 'translateY(0) translateX(0) rotate(0)';
	     		}
	     }
	 	 
	 }
