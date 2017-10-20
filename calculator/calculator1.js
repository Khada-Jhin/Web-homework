window.onload = function() {
	var log = console.log;
	var btns = document.getElementsByName("buttons");
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].addEventListener('click', function() {
			exec(event.target.textContent);
		});
	}
	function exec(str) {
		log();
		//if (str.length>2) str=""
		var old = document.getElementById("output").value;
		if (str == "←") {
			old = old.slice(0, old.length - 1);
		} else if (str == "CE") {
			old = "";
		} else if (str == "=") {
			try {
				old = eval(old);
			} catch (exception) {
				alert("Please input the right exception.");
				old = "";
			}
		} else if (str == "/" || str == "*" || str == "+" || str == "-") {
			try {
				var temp = old.substr(old.length - 1, 1);
				if (temp == "/" || temp == "*" || temp == "+" || temp == "-") throw "error";
				old += str;
			} catch (exception) {
				alert("Please input the right exception.");
				old = "";
			}
		} else {
			old += str;
		}
		show(old);
	}

	function show(result) {
		document.getElementById("output").value = result;
	}
}