function set(isNewest)
{
	if (isNewest == 1)
	{
		window.location.hash = "";
	}
	var comic = window.location.hash;
	comic = comic.slice(1);
	var prevImageSource = document.getElementById("img").getAttribute("src");
	var prevNumber = document.getElementById("number").innerHTML;
	var prevHover = document.getElementById("hover").innerHTML;
	var prevTitle = document.getElementById("title").innerHTML;
	document.getElementById("prev_button").style.display = "none";
	document.getElementById("next_button").style.display = "none";
	document.getElementById("latest_button").style.display = "none";
	document.getElementById("title").innerHTML = "Loading...";
	document.getElementById("hover").innerHTML = "Please Wait...";
	document.getElementById("img").setAttribute("src", "https://imgs.xkcd.com/comics/estimation.png");
	document.getElementById("number").innerHTML = "Loading comic taken from #612";
	$.ajax
	(
		{
			url: "http://dynamic.xkcd.com/api-0/jsonp/comic/" + comic + "?callback=?",
			dataType: "JSONP",
			success: function(data)
			{
				document.getElementById("img").style.display = "none";
				document.getElementById("img").removeAttribute("src");
				document.getElementById("img").setAttribute("src", data.img);
				document.getElementById("title").innerHTML = data.title;
				document.getElementById("hover").innerHTML = data.alt;
				document.getElementById("number").innerHTML = data.num;
				window.location.hash = data.num;
				document.getElementById("img").style.display = "";
				document.getElementById("prev_button").style.display = "";
				document.getElementById("next_button").style.display = "";
				document.getElementById("latest_button").style.display = "";
			},
			error: function(data)
			{
				document.getElementById("img").style.display = "none";
				document.getElementById("img").removeAttribute("src");
				document.getElementById("img").setAttribute("src", prevImageSource);
				document.getElementById("title").innerHTML = prevTitle;
				document.getElementById("hover").innerHTML = prevHover;
				document.getElementById("number").innerHTML = prevNumber;
				document.getElementById("img").style.display = "";
				document.getElementById("prev_button").style.display = "";
				document.getElementById("next_button").style.display = "";
				document.getElementById("latest_button").style.display = "";
				window.location.hash = prevNumber;
			}
		}
	);
}

function next()
{
	var num = parseInt(document.getElementById("number").innerHTML);
	window.location.hash = (num + 1).toString();
	set();
}

function prev()
{
	var num = parseInt(document.getElementById("number").innerHTML);
	window.location.hash = (num - 1).toString();
	set();
}

function jump()
{
	var num = parseInt(document.getElementById("jump_number").value);
	window.location.hash = num;
	set();
}
