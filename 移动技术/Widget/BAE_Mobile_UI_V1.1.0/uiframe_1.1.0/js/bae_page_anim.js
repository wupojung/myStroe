$.bae_page_anim=function(startPage){var preOperate=document.createElement("div");document.body.appendChild(preOperate);preOperate.style.display="none";preOperate.style.position="absolute";preOperate.style.top="0";preOperate.style.right="0";preOperate.style.left="0";preOperate.style.bottom="0";preOperate.style.zIndex="9999";preOperate.onclick=function(){console.log("page locked when slide anim");event.stopPropagation()};var curPageIndex=0;var pageHistory=[];var setStartPage=function(startPage){if(startPage){curPageIndex=0;for(var i=0;i<pageHistory.length;i++){$("#"+pageHistory[i]).removeClass("page");$("#"+pageHistory[i]).removeClass("current")}pageHistory=[];pageHistory.push(startPage);var $startPage=$("#"+startPage);if($startPage.length!=0){$startPage.addClass("page");$startPage.addClass("current")}}else{console.log("can't find startpage id in bae_page_anim")}};setStartPage(startPage);var slideToPageInner=function(pageTo,direction,callback,userOperate){var animation;var from=$("#"+pageHistory[curPageIndex]),to=$("#"+pageTo);if(direction=="left"){animation="slideLeft";curPageIndex++;var length=pageHistory.length;if(userOperate!="false"&&curPageIndex<length){pageHistory=pageHistory.slice(0,curPageIndex)}length=pageHistory.length;if(curPageIndex==length||(curPageIndex<length&&pageTo!=pageHistory[curPageIndex])){pageHistory.push(pageTo)}}else{animation="slideRight";curPageIndex--}preOperate.style.display="block";from.addClass(animation+" page out");to.addClass(animation+" page in current");to.bind("webkitAnimationEnd",function(){from.removeClass("current "+animation+" out");to.unbind("webkitAnimationEnd");to.removeClass(animation+" in");preOperate.style.display="none";if(typeof callback=="function"){callback()}})};var back=function(callback){if(pageHistory.length>0&&curPageIndex>0){slideToPageInner(pageHistory[curPageIndex-1],"right",callback,"false")}else{$.bae_toast("\u5df2\u7ecf\u5230\u7b2c\u4e00\u9875\uff0c\u4e0d\u80fd\u518d\u540e\u9000")}};var forward=function(callback){if(curPageIndex<pageHistory.length-1){slideToPageInner(pageHistory[curPageIndex+1],"left",callback,"false")}else{$.bae_toast("\u5df2\u7ecf\u5230\u6700\u540e\u4e00\u9875\uff0c\u4e0d\u80fd\u518d\u524d\u8fdb")}};var slideToPage=function(pageTo,direction,callback){console.log("slideToPage");var $pageTo=$("#"+pageTo);if($pageTo.length!=0){$pageTo.addClass("page")}slideToPageInner(pageTo,direction,callback,"true")};return{slideToPage:slideToPage,back:back,setStartPage:setStartPage}};
