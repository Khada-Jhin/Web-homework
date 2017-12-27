var sum=0;
var clicked=0;
var get;
$(function(){
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
	clicked=0;
	sum=0;
}
function big_click(){
	if(clicked==5){
		$("#sum").text(sum);
	}
}
function get_num(obj){
	//console.log("1");
	if($(obj).attr("disabled")=="disabled"){
		return;
	}
	$(obj).attr("name","got");
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
		sum+=parseInt(data);
		if(clicked==5){
			$("#big").css("background-color","#21489d");
			big_click();	
		}				
	});
}
function robot(){
	var list=$("li");
	for(var i=0;i<5;i++){
		get_num(list[i]);
	}
}