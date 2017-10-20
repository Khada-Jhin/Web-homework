window.onload = function() {

	var bts = document.getElementsByName("buttons");
	for (var i = bts.length - 1; i >= 0; i--) {
		bts[i].onclick = function() {
			exec(event.target.textContent);
		}
	}


	function exec(str) {
		//alert(str);
		//if (str.length>2) str=""
		var old = document.getElementById("output").value;
		if (str == "←") {
			old = old.slice(0, old.length - 1);
		} else if (str == "CE") {
			old = "";
		} else if (str == "=") {
			try {
				old = eval(old).toString();
				if (old.match('.') != null) {
					old = parseFloat(old).toFixed(12).toString();
					old = parseFloat(old);
				}


			} catch (exception) {
				alert("请输入正确公式");
				old = "";
			}
		} else if (str == "/" || str == "*" || str == "+" || str == "-") {
			try {
				var temp = old.substr(old.length - 1, 1);
				if (temp == "/" || temp == "*" || temp == "+" || temp == "-") throw "error";
				old += str;
			} catch (exception) {
				alert("请输入正确公式");
				old = "";
			}
		} else if (str == "0") {
			try {
				var temp = old.substr(old.length - 1, 1);
				if (temp == "/") throw "error";
				old += str;
			} catch (exception) {
				alert("不能除以0");
				old = "";
			}
		} else {
			old += str;
		}
		show(old);
	}

	function show(result) {
		//result=parseFloat(result);
		document.getElementById("output").value = result;
	}
}