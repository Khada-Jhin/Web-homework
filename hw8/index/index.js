name_reg = /^[a-zA-Z][a-zA-Z0-9_]*/;
id_reg = /^[1-9][0-9]*/;
email_reg = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
reset=false;
var temp_n='', temp_id='',temp_p='',temp_e='',temp;

$(document).ready(function() {

    $("#username").focus(function() {namefocus();});
    $("#username").blur(function() {nameblur();});

    $("#std_id").focus(function() {stdidfocus();});
    $("#std_id").blur(function() {stdidblur()});

    $("#phone").focus(function() {phonefocus();});
    $("#phone").blur(function() {phoneblur();});

    $("#email").focus(function() {emailfocus();});
    $("#email").blur(function() {emailblur();});

    $("#submit").click(function() {
        if (validate()) {
            $("form").submit();
        } else {
            alert('存在错误\n请完善表单内容后再提交');
        }
    })

    $('#reset').mousedown(function() {
    	reset=true;
		$("#name_er").hide();
		$("#id_er").hide();
		$("#phone_er").hide();
		$("#email_er").hide();    	
    	$("#username,#std_id,#phone,#email").val('');
        $("#name_er").text('');
		$("#id_er").text('');
		$("#phone_er").text('');
		$("#email_er").text('');                     
    });
    $('#reset').mouseup(function(){
    	reset=false;
    });
});
function validate() {
    var ok="OK!";
    if ($("#name_er").text() == ok && $("#id_er").text() == ok
        && $("#phone_er").text() == ok && $("#email_er").text() == ok) {
        return true;
    } else {
        return false;
    }
}

function namefocus() {
	temp=$("#name_er").text();
	$("#name_er").show();
    $("#name_er").text("提示: 6~18位英文字母、数字或下划线，必须以英文字母开头");
    temp_n=$("#username").val();
}

function nameblur() {    
	if(reset){
		return;
	}
    var obj=$("#username").val();

    if(obj==temp_n&&temp=="Error:用户名重复"){
    	$("#name_er").text(temp)
    	return;
    }
    //不能为空
    if (obj == "") {
        $("#name_er").text("错误: 不能为空!");
    }
    //含有非法字符
    else if (!name_reg.test(obj)) {
        $("#name_er").text("错误: 含有非法字符!");
    }
    //长度超过18位
    else if (obj.length > 18) {
        $("#name_er").text("错误: 长度超过18位!");
    }
    //长度少于6位
    else if(obj.length < 6) {
        $("#name_er").text("错误: 长度少于6位!");
    }
    //OK
    else {
        $("#name_er").text("OK!");
    }
}

function stdidfocus() {
	temp=$("#id_er").text();
	$("#id_er ").show();
    $("#id_er").text("提示: 8位数字，不能以0开头");
    temp_id=$("#std_id").val();
}

function stdidblur() {
	if(reset){
		return;
	}	
	var obj=$("#std_id").val();

	if(obj==temp_id&&temp=="Error:学号重复"){
		$("#id_er").text(temp)
    	return;
    }	
    //不能为空
    if (obj == "") {
        $("#id_er").text("错误: 不能为空!");
    }
    //非法学号
    else if (!id_reg.test(obj)) {
        $("#id_er").text("错误: 非法学号!");
    }
    //学号应为8位
    else if (obj.length != 8) {
        $("#id_er").text("错误: 学号应为8位!");
    }
    //OK
    else {
        $("#id_er").text("OK!");
    }
}

function phonefocus() {
	temp=$("#phone_er").text();
	$("#phone_er").show();
    $("#phone_er").text("提示: 11位数字，不能以0开头");
    temp_p=$("#phone").val();
}

function phoneblur() {
	if(reset){
		return;
	}	
	var obj=$("#phone").val();

	if(obj==temp_p&&temp=="Error:电话重复"){
		$("#phone_er").text(temp);
    	return;
    }	
    //不能为空
    if (obj == "") {
        $("#phone_er").text("错误: 不能为空");
    }
    //非法电话号码
    else if (!id_reg.test(obj)) {
        $("#phone_er").text("错误: 非法电话号码");
    }
    //电话号码应为11位
    else if (obj.length != 11) {
        $("#phone_er").text("错误: 电话号码应为11位");
    }
    //OK
    else {
        $("#phone_er").text("OK!");
    }
}

function emailfocus(email_msg) {
	temp=$("#email_er").text();
	$("#email_er").show();
    $("#email_er").text("提示: 请填写常用邮箱");
    temp_e=$("#email").val();
}

function emailblur(obj, email_msg, email_re) {
	if(reset){
		return;
	}	
	var obj=$("#email").val();
	
	if(obj==temp_e&&temp=="Error:邮箱重复"){
		$("#email_er").text(temp);
    	return;
    }
    //不能为空
    if (obj == "") {
        $("#email_er").text("错误: 不能为空");
    }
    //非法邮箱
    else if (!email_reg.test(obj)) {
        $("#email_er").text("错误: 非法邮箱");
    }
    //OK
    else {
        $("#email_er").text("OK!");
    }
}
