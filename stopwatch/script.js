var time1 = 0;
var stat1 = 0;
function render1(id, time)
{
	var milliseconds = time % 100;
	var seconds = ((time - milliseconds) / 100) % 60;
	var minutes = Math.floor(time / 6000);
	if (milliseconds.toString().length == 1)
	{
		milliseconds = "0" + milliseconds;
	}
	if (seconds.toString().length == 1)
	{
		seconds = "0" + seconds;
	}
	if (minutes.toString().length == 1)
	{
		minutes = "0" + minutes;
	}
	document.getElementById(id).innerHTML = minutes + ":" + seconds + "." + milliseconds;
}
function stopwatch_helper()
{
	if (stat1 == 1)
	{
		time1 += 1;
	}
	else if (stat1 == 2)
	{
		time1 = 0;
	}
	render1("stopwatch", time1);
}

function toggle1()
{
	if (stat1 == 0 || stat1 == 2)
	{
		stat1 = 1;
		document.getElementById("toggle1").innerHTML = "Stop";
		document.getElementById("toggle1").style.background = "crimson";
	}
	else if (stat1 == 1)
	{
		stat1 = 0;
		document.getElementById("toggle1").innerHTML = "Start";
		document.getElementById("toggle1").style.background = "lightgreen";
	}
}

function reset1()
{
	stat1 = 2;
	document.getElementById("toggle1").innerHTML = "Start";
	document.getElementById("toggle1").style.background = "lightgreen";
}

function stopwatch()
{
	setInterval(stopwatch_helper, 10);
}


