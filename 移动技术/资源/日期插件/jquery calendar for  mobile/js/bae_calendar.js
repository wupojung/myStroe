$.extend({getAttrFixed:function(e,key){var value=e.getAttribute(key);return value==="true"?true:value==="false"?false:value===null?undefined:value}});var Calendar=function($calender,handler,date,disableCondition){this.disableCondition=null;if(disableCondition){this.disableCondition=disableCondition}if(date){this._selectedDay=this.NewDate(date)}else{this._selectedDay=new Date()}this.year=this._selectedDay.getFullYear();this.tempYear=this.year;this.month=this._selectedDay.getMonth()+1;this.tempMonth=this.month;this.$calendar=$calender;this.tempTotalDays=this.getTotalDays(this.year);this.dateHandler=handler+'($(this).parents(".Date").siblings(".Month").attr("data-year") +"-"+ $(this).parents(".Date").siblings(".Month").attr("data-month")+"-"+$(this).attr("data-date"))';this.creatDate(this.year,this.month)};Calendar.prototype.NewDate=function(str){var strArray=str.split("/");if(3!=strArray.length){strArray=str.split("-")}var date=new Date();date.setUTCFullYear(strArray[0],strArray[1]-1,strArray[2]);date.setUTCHours(0,0,0,0);return date};Calendar.event=(function(){if("ontouchstart" in window){return"touchend"}else{return"click"}})();Calendar.prototype.getTotalDays=function(yy){var FebruaryDays=this.IsPinYear(yy)?29:28;return[31,FebruaryDays,31,30,31,30,31,31,30,31,30,31]};Calendar.prototype.IsPinYear=function(yy){return 0==yy%4&&((yy%100!=0)||(yy%400==0))};Calendar.prototype.domEventObj=[];Calendar.prototype.addEvent=function(){this.addSwitchMonthEvent()};Calendar.prototype.removeEvent=function(){if(!this.domEventObj){return}var obj=this.domEventObj;for(var i=0;i<obj.length;i++){obj[i].dom.removeEventListener(Calendar.event,obj[i].handler)}};Calendar.prototype.addSwitchMonthEvent=function(){var dom=this.$calendar.get(0).getElementsByClassName("Month")[0],subDom=dom.getElementsByTagName("a"),_this=this;subDom[0].addEventListener(Calendar.event,handlerA);subDom[1].addEventListener(Calendar.event,handlerB);function handlerA(event){_this.addSwitchMonthHandler(false);event.preventDefault()}function handlerB(event){_this.addSwitchMonthHandler(true);event.preventDefault()}this.domEventObj.push({dom:subDom[0],handler:handlerA},{dom:subDom[1],handler:handlerB})};Calendar.prototype.addSwitchMonthHandler=function(isNext){if(isNext){this.tempMonth++}else{this.tempMonth--}if(this.tempMonth>12){this.tempMonth=1;this.tempYear++}if(this.tempMonth<1){this.tempMonth=12;this.tempYear--}this.tempTotalDays=this.getTotalDays(this.tempYear);this.creatDate(this.tempYear,this.tempMonth)};Calendar.prototype.needDisable=function(date){if(this.disableCondition){if(")"==this.disableCondition.charAt(this.disableCondition.length-1)){var index=this.disableCondition.lastIndexOf("(");this.disableCondition=this.disableCondition.substring(0,index)}try{return eval(this.disableCondition+"('"+date+"')")}catch(e){console.log(e)}}};Calendar.prototype.creatDate=function(yy,mm){var _today=new Date(),_t_year=_today.getFullYear(),_t_month=_today.getMonth()+1,_t_date=_today.getDate(),_selected_year=this._selectedDay.getFullYear(),_selected_month=this._selectedDay.getMonth()+1,_selected_date=this._selectedDay.getDate(),_date=new Date(yy+"/"+(mm<10?"0"+mm:mm)+"/01"),_year=_date.getFullYear(),_month=_date.getMonth()+1,_day=_date.getDay(),_totalDays=this.tempTotalDays[_month-1],_lastDays=_totalDays-(7-_day),_otherWeekSum=Math.floor(_lastDays/7),_lastWeekDays=_lastDays%7,row,i=0,j=0,k=0,num=1,dom=this.$calendar.get(0),html="";if(_lastWeekDays>0){row=_otherWeekSum+2}else{row=_otherWeekSum+1}this.removeEvent();dom.innerHTML="";html+='<div class="Month" data-year="'+yy+'" data-month="'+mm+'"><a href="javascript:;" class="previous"></a><span>'+yy+"\u5e74"+mm+'\u6708</span><a href="javascript:;" class="next"></a></div>';html+='<div class="Day"><a>\u5468\u65e5</a><a>\u5468\u4e00</a><a>\u5468\u4e8c</a><a>\u5468\u4e09</a><a>\u5468\u56db</a><a>\u5468\u4e94</a><a>\u5468\u516d</a></div><div class="Date"><p>';for(;i<7;i++){if(i<_day){html+='<a href="javascript:;" data-day="w-'+i+'" data-date="0">&nbsp;</a>'}else{html+='<a href="javascript:;" data-day="w-'+i+'" data-date="'+num+'">'+(num++)+"</a>"}}html+="</p>";for(;j<_otherWeekSum;j++){html+='<p><a href="javascript:;" data-day="w-0" data-date="'+num+'">'+(num++)+'</a><a href="javascript:;" data-day="w-1" data-date="'+num+'">'+(num++)+'</a><a href="javascript:;" data-day="w-2" data-date="'+num+'">'+(num++)+'</a><a href="javascript:;" data-day="w-3" data-date="'+num+'">'+(num++)+'</a><a href="javascript:;" data-day="w-4" data-date="'+num+'">'+(num++)+'</a><a href="javascript:;" data-day="w-5" data-date="'+num+'">'+(num++)+'</a><a href="javascript:;" data-day="w-6" data-date="'+num+'">'+(num++)+"</a></p>"}if(_lastWeekDays>0){html+="<p>";for(;k<7;k++){if(num>_totalDays){html+='<a href="javascript:;" data-day="w-'+i+'" data-date="0">&nbsp;</a>'}else{html+='<a href="javascript:;" data-day="w-'+i+'" data-date="'+num+'">'+(num++)+"</a>"}}html+="</p>"}html+="</div>";dom.innerHTML=html;var tag_d=dom.getElementsByClassName("Date")[0].getElementsByTagName("a");var tag_m=dom.getElementsByClassName("Month")[0];var tagYearAttr=tag_m.getAttribute("data-year");var tagMonthAttr=tag_m.getAttribute("data-month");if((_t_year==_year&&_t_month==_month)||(_selected_year==_year&&_selected_month==_month)){if(_t_year==_selected_year&&_t_month==_selected_month){for(var l=0;l<tag_d.length;l++){var eachTag=tag_d[l],eachTagAttr=eachTag.getAttribute("data-date");if(eachTagAttr==_selected_date+""){$(eachTag).addClass("selectedDay")}if(eachTagAttr==_t_date+""){$(eachTag).addClass("nowDay")}if(parseInt(eachTagAttr)==0||this.needDisable(tagYearAttr+"/"+tagMonthAttr+"/"+eachTagAttr)){eachTag.className="gray"}else{eachTag.setAttribute("onclick",this.dateHandler)}}}else{if(_t_year==_year&&_t_month==_month){for(var l=0;l<tag_d.length;l++){var eachTag=tag_d[l],eachTagAttr=eachTag.getAttribute("data-date");if(eachTagAttr==_t_date+""){eachTag.className="nowDay"}if(parseInt(eachTagAttr)==0||this.needDisable(tagYearAttr+"/"+tagMonthAttr+"/"+eachTagAttr)){eachTag.className="gray"}else{eachTag.setAttribute("onclick",this.dateHandler)}}}if(_selected_year==_year&&_selected_month==_month){for(var l=0;l<tag_d.length;l++){var eachTag=tag_d[l],eachTagAttr=eachTag.getAttribute("data-date");if(eachTagAttr==_selected_date+""){eachTag.className="selectedDay"}if(parseInt(eachTagAttr)==0||this.needDisable(tagYearAttr+"/"+tagMonthAttr+"/"+eachTagAttr)){eachTag.className="gray"}else{eachTag.setAttribute("onclick",this.dateHandler)}}}}}else{for(var m=0;m<tag_d.length;m++){var eachTag=tag_d[m],eachTagAttr=eachTag.getAttribute("data-date");if(parseInt(eachTagAttr)==0||this.needDisable(tagYearAttr+"/"+tagMonthAttr+"/"+eachTagAttr)){eachTag.className="gray"}else{eachTag.setAttribute("onclick",this.dateHandler)}}}this.addEvent()};$.fn.bae_chooseOldDate=function(date){var current=new Date(date);var today=new Date();var start=new Date(today.getFullYear(),today.getMonth(),today.getDate());return current<start?true:false};$.fn.bae_calendar=function(options){var $jqObj=this;options=(options&&($.type(options)==="object"))?options:{};$.each($jqObj,function(index,element){var $calender=$(element);$calender.addClass("ui-bae-date");var o=$.extend({},$.fn.bae_calendar.defaults,{date:options.date!==undefined?options.date:$.getAttrFixed(element,"data-default-date"),event:options.event!==undefined?options.event:$.getAttrFixed(element,"data-event"),disableCondition:options.disableCondition!==undefined?options.disableCondition:$.getAttrFixed(element,"data-disable-condition")},options);var chooseOldDate=$.getAttrFixed(element,"data-choose-old-date");if("false"==chooseOldDate||false==chooseOldDate){o.disableCondition="$.fn.bae_chooseOldDate()"}var mydate=new Calendar($calender,o.event,o.date,o.disableCondition)})};$.fn.bae_calendar.defaults={date:"",event:"",disableCondition:"function(){return false;}"};$(function(){$("[data-role='bae_calendar']").bae_calendar()});
