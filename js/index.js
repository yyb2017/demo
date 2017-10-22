// 命名空间
window.onload = function() {
	mv.app.toBanner();
	mv.app.toServiceTab();
	// mv.app.member();
	mv.app.media();
}
var mv = {};
// 工具
mv.tools = {};
// 组件
mv.ui = {};
// 应用
mv.app = {};

// 获取样式
mv.tools.getStyle = function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
};
// 选项卡
// mv.ui.tab = function tab(oLi,oLiName) {
mv.ui.tab = function tab(oLi,aLi,oLiName,aLiName) {
	for (var i = 0; i < oLi.length; i++) {
		oLi[i].index = i;
		oLi[i].onmouseover=function() {
			for (var i = 0; i < oLi.length; i++) {
				oLi[i].className = '';
				aLi[i].className = '';
			}
			this.className = oLiName;
			aLi[this.index].className = aLiName;
		}
	}
}
// 淡出效果
mv.ui.fadeIn = function(obj){
	
	var iCur = mv.tools.getStyle(obj,'opacity');
	if(iCur==1){ return false; }
	
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = 5;
		if(value == 100){
			clearInterval(obj.timer);
		}
		else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};

// 淡入效果
mv.ui.fadeOut = function(obj){
	
	var iCur = mv.tools.getStyle(obj,'opacity');
	if(iCur==0){ return false; }
	
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = -5;
		if(value == 0){
			clearInterval(obj.timer);
		}
		else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};

// 轮播图
mv.app.toBanner = function(){
	var oPrev = document.getElementById('banner_prev');
	var oNext = document.getElementById('banner_next');
	var banner = document.getElementById('banner');
	var bannerL = document.getElementById('banner_list');
	var aLi = bannerL.getElementsByTagName('li');
	var iNow = 0;
	
	timer = setInterval(auto,2000);		
	// 往左
	function auto(){
		if(iNow == aLi.length-1){
			iNow = 0;
		}
		else{
			iNow++;
		}
		
		for(var i=0;i<aLi.length;i++){
			mv.ui.fadeOut(aLi[i]);
		}
		
		mv.ui.fadeIn(aLi[iNow]);
	}
	// 往右
	function autoPrev(){		
		if(iNow == 0){
			iNow = aLi.length-1;
		}
		else{
			iNow--;
		}
		
		for(var i=0;i<aLi.length;i++){
			mv.ui.fadeOut(aLi[i]);
		}
		
		mv.ui.fadeIn(aLi[iNow]);
	}
	// 移入移出banner事件
	banner.onmouseover = function() {
		oPrev.style.display = 'block';
		oNext.style.display = 'block';
		clearInterval(timer);
	}
	banner.onmouseout = function() {
		oPrev.style.display = 'none';
		oNext.style.display = 'none';
		timer=setInterval(auto,2000);
	}	
	// 按钮点击
	oPrev.onclick = function(){
		clearInterval(timer);
		autoPrev();
	};
	
	oNext.onclick = function(){
		clearInterval(timer);
		auto();
	};

}

// 服务选项卡
mv.app.toServiceTab = function() {
	var oUl = document.getElementById('service_tab_ul');
	var oOl = document.getElementById('service_ol');
	var oLi = oUl.getElementsByTagName('li');
	var aLi = oOl.getElementsByTagName('li');
	mv.ui.tab(oLi,aLi,'active','show');
}
// 媒体
mv.app.media = function() {
	var fmWrap_up = document.getElementById('fmWrap_up');
	var media_l = document.getElementById('media_banner_list');
	var oLi = fmWrap_up.getElementsByTagName('li');
	var media_m = document.getElementsByClassName('media_main');
	var mediaMenu = document.getElementsByClassName('media_menu');
	var aLi = [];
	var mLi = [];
	for (var i = 0; i < media_m.length; i++) {
		aLi.push(media_m[i].getElementsByTagName('ul'));
		mLi.push(mediaMenu[i].getElementsByTagName('li'));
		mv.ui.tab(mLi[i],aLi[i],'active','show');
	}
	var target = 0;
	var leader = 0;
	var timer = null;
	for (var i = 0; i < oLi.length; i++) {
		oLi[i].index = i;
		oLi[i].onclick = function() {
			clearInterval(timer);		
			target = -this.index*media_m[0].offsetWidth;			
			timer = setInterval(autoplay, 30);
			function autoplay() {
		        leader = leader + (target - leader ) / 10;
		        media_l.style.left = leader + "px";
			}

		}
	}
}


