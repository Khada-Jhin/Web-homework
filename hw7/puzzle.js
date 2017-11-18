$(document).ready(function() {
	var tag = 0;
	var img=0;
	$("#tu").toggle();
	$("#start").click(function() {
		mix();
		$("h2").text("开始游戏！");
		tag = 1;
	});
	$(".picture").click(function(e) {
		var x = parseInt(e.target.id.slice(1));
		//console.log(x);
		if (valid(x) && tag == 1) {
			exchange(x);
		}
		if (win() && tag == 1) {
			$("h2").text("你赢了！");
			tag = 0;
		}
	});
	$("#restore").click(function() {
		if (tag == 1) {
			restore();
			tag = 0;
			$("h2").text("已还原，请重新开始游戏！");
		}
	});
	$("#change").click(function(){
		if(tag==0&&img==0){
			$(".picture").css("background-image","url(lianghao.jpg)");
			$("#tip").css("background-image","url(lianghao.jpg)");
			$("#g16").css("background-image","none");
			$("p").text("良澔大佬NB");
			$("h2").text("已更换图片！");
			img=1;
		}
		else if(tag==0&&img==1){
			$(".picture").css("background-image","url(panda.jpg)");
			$("#g16").css("background-image","none");
			$("#tip").css("background-image","url(panda.jpg)");
			$("p").text("功夫熊猫");
			$("h2").text("已更换图片！");
			img=0;
		}
		else{
			$("h2").text("游戏中无法更换图片！");
		}
	});
	$("#show").click(function(){
		$("#tu").toggle();
	});
});

function mix() {
	for (var i = 1000; i >= 0; i--) {
		var x = Math.ceil(Math.random() * 16);
		if (valid(x)) {
			exchange(x);
		}
	}
}

function valid(x) {
	var pos_x = $("#g" + x).attr("name");
	var y = $("#g16").attr("name");
	var x_row = Math.ceil(pos_x / 4);
	var y_row = Math.ceil(y / 4);
	var z = y - pos_x;
	var abs = Math.abs;
	var isValid = abs(x_row - y_row);
	if (isValid === 1 && (z == 4 || z == -4)) {
		return true;
	} else if (isValid === 0 && (z == 1 || z == -1)) {
		return true;
	} else {
		return false;
	}
}

function exchange(x) {
	var pos_x = $("#g" + x).attr("name");
	var y = $("#g16").attr("name");
	var pos1 = $("#g" + x).position();
	var pos2 = $("#g16").position();
	$("#g" + x).css({
		"left": pos2.left,
		"top": pos2.top
	});
	$("#g16").css({
		"left": pos1.left,
		"top": pos1.top
	});
	$("#g16").attr("name", pos_x);
	$("#g" + x).attr("name", y);
}

function win() {
	for (var i = 1; i <= 16; i++) {
		var pos_x = $("#g" + i).attr("name");
		if (pos_x != i) {
			return false;
		}
	}
	return true;
}

function restore() {
	for (var i = 1; i <= 16; i++) {
		var left;
		if (i % 4 != 0) {
			left = (i % 4 - 1) * 90;
		} else {
			left = 270;
		}
		var top = (Math.ceil((i / 4)) - 1) * 90;
		$("#g" + i).css({
			"left": left + "px",
			"top": top + "px"
		}).attr("name", i);
	}
}