window.onload = function() {
	var flag = 0;
	var inside = 0;
	var start = document.getElementById('start');
	var end = document.getElementById('end');
	var walls = document.getElementsByClassName('walls');
	var message = document.getElementById('message');
	var maze = document.getElementById('maze');
	maze.onmouseover = function() {
		inside = 1;
	}
	maze.onmouseleave = function() {
		inside = 0;
	}
	start.onmouseover = function() {
		flag = 1;
		message.innerHTML = '';
	}
	for (var i = walls.length - 1; i >= 0; i--) {
		walls[i].onmouseover = mouseHoverHandler;
		walls[i].onmouseout = function() {
			this.style.backgroundColor = 'rgb(238, 238, 238)';
		}
	}

	function mouseHoverHandler() {
		if (flag == 1) {
			this.style.backgroundColor = 'red';
			message.innerHTML = 'You Lose';
			flag = 0;
		}
	}
	end.onmouseover = function() {
		if (flag == 1 && inside == 1) {
			message.innerHTML = 'You Win';
			flag = 0;
		}
		if (flag == 1 && inside == 0) {
			message.innerHTML = 'Don\'t cheat, you should start form the \'S\' and move to the \'E\' inside the maze!';
			flag = 0;
		}
	}
};