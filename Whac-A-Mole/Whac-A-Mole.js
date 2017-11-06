window.onload = function() {
	var flag = 0;
	var radio = document.getElementsByName('radio');
	var start = document.getElementById('start');
	var score = document.getElementById('score');
	var time = document.getElementById('time');
	var show = document.getElementById('show');
	var seed = 0;
	var t;;
	start.onclick = function() {
		if (flag == 0) {
			flag = 1;
			if (time.value == 0) {
				score.value = 0;
				time.value = 30;
			}
			seed = random();
			show.value = "Playing";
			if (time.value == 30) {
				radio[seed].checked = 'true';
			}
			t = setInterval(timer, 1000);
		} else {
			sum();
		}
	};
	var i;
	for (i = radio.length - 1; i >= 0; i--) {
		radio[i].onclick = function() {
			if (event.target.value == seed && flag == 1) {
				//console.log(event.target);
				score.value++;
				this.checked = false;
				seed = random();
				radio[seed].checked = true;
			} else if (event.target.value != seed && flag == 1) {
				event.target.checked = false;
				radio[seed].checked = 'true';
				score.value--;
			} else if (flag == 0) {
				event.target.checked = false;
			}
		}
	}

	function random() {
		return Math.floor(Math.random() * 60);
	};

	function timer() {
		if (time.value > 0) {
			time.value = time.value - 1;
		} else {
			sum();
		}
	};

	function sum() {
		flag = 0;
		alert('Game Over!' + '\n' + 'Your Score is:  ' + score.value);
		radio[seed].checked = false;
		time.value = 0;
		show.value = "Game Over!";
		clearInterval(t);
		//alert('Game Over!' + '\n' + 'Your Score is:  ' + score.value);
	};
};