// render function is to draw on HTML
var time2 = 0;
var stat2 = 0;

function render2(id, time)
{
	var milliseconds = time % 100;
	var seconds = ((time - milliseconds) / 100) % 60;
	var minutes = Math.floor(time / 6000);
	if (seconds.toString().length == 1)
	{
		seconds = "0" + seconds;
	}
	document.getElementById(id).innerHTML = minutes + ":" + seconds
}

function alarm()
{
	var alarm = new Audio("../other/alarm.mp3");
	function play()
	{
		alarm.play();
	}
	alarm.play();
	setTimeout(play, 1000);
	setTimeout(play, 2000);
	setTimeout(play, 3000);
	setTimeout(play, 4000);
}

function timer_helper()
{
	render2("timer", time2)
	if (stat2 == 1)
	{
		if (time2 == 0)
		{
			alarm();
			stat2 = 0;
			document.getElementById("toggle2").innerHTML = "Start";
			document.getElementById("toggle2").style.background = "lightgreen";
		}
		else
		{
			time2 -= 1;
			document.getElementById("toggle2").innerHTML = "Stop";
			document.getElementById("toggle2").style.background = "crimson";
		}
	}
	else if (stat2 == 2)
	{
		time2 = 0;
		stat2 = 0;
		document.getElementById("toggle2").innerHTML = "Start";
		document.getElementById("toggle2").style.background = "lightgreen";
	}
	else
	{
		document.getElementById("toggle2").innerHTML = "Start";
		document.getElementById("toggle2").style.background = "lightgreen";
	}
}

function toggle2()
{
	if (stat2 == 0 && time2 !== 0)
	{
		stat2 = 1;
	}
	else if (stat2 == 1)
	{
		stat2 = 0;
	}
}

function reset2()
{
	stat2 = 2;
}

function add_30_sec()
{
	stat2 = 0;
	time2 += 3000;
}

function reset_sec()
{
	stat2 = 0;
	time2 = time2 - (time2 % 6000);
}

function add_min()
{
	stat2 = 0;
	time2 += 6000;
}

function reset_min()
{
	stat2 = 0;
	time2 = time2 - (Math.floor(time2 / 6000) * 6000);
}

function timer()
{
	setInterval(timer_helper, 10);
}

