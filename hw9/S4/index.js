var sum=0;
var clicked=0;
var index=0;
var get;
var tag=false;
$(function(){
	$("#message").hide();
	$("#button").mouseleave(function(){
		restart();
	});
	$("#big").click(function(){
		big_click();
	});
	$("li").click(function(){
		get_num(this);
	});
	$(".icon").click(function(){
		robot();
		tag=true;
	});	
});
function restart(){
	if(get) get.abort();
	$(".number").css("display","none");
	$("li").each(function(){$(this).css("background-color","#21489d");});
	$("li").each(function(){$(this).attr("name","get");});
	$("li").each(function(){$(this).removeAttr("disabled");});
	$("#big").css("background-color","#7e7e7e");
	$("#sum").text('');
	$("#message").hide();
	clicked=0;
	index=0;
	sum=0;
	tag=false;
}
function big_click(){
	if(clicked==5){
		$("#sum").text(sum);
	}
}
function get_num(obj){
	if($(obj).attr("disabled")=="disabled"){
		return;
	}
	$(obj).attr("name","got");
	$("li").each(function(){
		if($(this).attr("name")!="got"){
			$(this).css("background-color","#7e7e7e");
			$(this).attr("disabled","disabled");
		}
	});
	var num=$(obj).children("span");
	$(num).css("display","block").text("...");
	$.get("2333.txt",function(data){
		$(num).text(data)
		$(obj).css("background-color","#7e7e7e");
		$(obj).attr("disabled","disabled");
		$("li").each(function(){
			if($(this).attr("name")!="got"){
				$(this).css("background-color","#21489d");
				$(this).removeAttr("disabled");
			}
		});
		clicked++;
		sum+=parseInt(data);
		if(clicked==5){
			$("#big").css("background-color","#21489d");	
		}				
	});
}
function get_num_robot(obj,list,random){
	if($(obj).attr("disabled")=="disabled"){
		return;
	}
	$(obj).attr("name","got");
	$("li").each(function(){
		if($(this).attr("name")!="got"){
			$(this).css("background-color","#7e7e7e");
			$(this).attr("disabled","disabled");
		}
	});
	var num=$(obj).children("span");
	$(num).css("display","block").text("...");
	get=$.get("2333.txt",function(data){
		$(num).text(data)
		$(obj).css("background-color","#7e7e7e");
		$(obj).attr("disabled","disabled");
		$("li").each(function(){
			if($(this).attr("name")!="got"){
				$(this).css("background-color","#21489d");
				$(this).removeAttr("disabled");
			}
		});
		clicked++;
		index++;
		sum+=parseInt(data);
		if(clicked==5){
			$("#big").css("background-color","#21489d");
			big_click();	
		}
		else{
			get_num_robot(list[random[index]],list,random);
		}				
	});
}
function robot(){
	if(tag==true){
		return;
	}
	var list=$("li");
	var str="";
	var gotten=[];
	for(var i=0;i<5;i++){
		if($(list[i]).attr("disabled")=="disabled"){
			gotten.push(i);
		}
	}
	var random=[];
	var n=5-gotten.length;
	while(random.length<n){
		var random_num=Math.floor(Math.random()*5);
		var flag=false;
		random.push(random_num);
		for(var i=0;i<gotten.length;i++){
			if(gotten[i]==random_num){
				random.pop();
				flag=true;
			}
		}		
		for(var i=0;i<random.length-1;i++){
			if(random[i]==random_num&&flag==false){
				random.pop();
			}
		}
	}
	for(var i=0;i<random.length;i++){
		str=str+$(list[random[i]]).attr("title");
	}
	$("#message").text(str);
	$("#message").show();
	get_num_robot(list[random[index]],list,random);
}

