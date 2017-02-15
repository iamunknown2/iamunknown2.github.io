var bigContainerElement = document.getElementById("big-container");
var primerElement = document.getElementById("primer");
var dialogElement = document.getElementById("dialog");
var colorElement = document.getElementById("color");
var resultsElement = document.getElementById("results");
var time = 0;
var counter = 0;
var juststarted = true;
var correspondingSequence = [];
var correspondingSequenceHelper = [];
var nonCorrespondingColorArray = [];
var correspondingColorArray = [];
for (var i = 0; i < 10; i++) {
	correspondingSequence.push(1);
}
for (var i = 0; i < 10; i++) {
	correspondingSequence.push(0);
}
var scrambleTime = correspondingSequence.length;
for (var i = 0; i < scrambleTime; i++) {
	var randomItemNumber = Math.floor(Math.random() * correspondingSequence.length);
	correspondingSequenceHelper.push(correspondingSequence[randomItemNumber]);
	correspondingSequence.splice(randomItemNumber, 1)
}
correspondingSequence = correspondingSequenceHelper;
console.log(correspondingSequence);
var randomColor = function() {
	var colors = ["red", "blue", "yellow", "orange", "purple", "green"];
	return colors[Math.floor(Math.random() * colors.length)];
}
var response = function(color) {
	if (colorWord != colorColor) {
		if (colorColor == color) {
			nonCorrespondingColorArray.push(Date.now() - time);
		} else {
			nonCorrespondingColorArray.push(time - Date.now()); // If it is wrong, the results will show the result as a negative number instead.
		}
	}
	else {
		if (colorColor == color) {
			correspondingColorArray.push(Date.now() - time);
		} else {
			correspondingColorArray.push(time - Date.now()); // If it is wrong, the results will show the result as a negative number instead.
		}
	}
}
var cycle = function(color) {
	if (counter >= 20) {
		resultsElement.innerHTML = window.location.href.split("#")[1] + ";" + nonCorrespondingColorArray + ";" + correspondingColorArray;
		dialogElement.innerHTML = "The experiment has ended. Thank you for participating. Please copy and paste the lists below (keep the brackets) and send them to <a href='mailto:strooptest.100.eyc314@xoxy.net?subject=Results&body=" + resultsElement.innerHTML +"'>strooptest.100.eyc314@xoxy.net</a> (if you can open the mailto link (the bold part), the entire email has already been packaged and you can simply click send)";
		colorElement.style.display = "none";
	} else if (!juststarted && color != "start") {
		counter += 1;
		response(color);
		colorWord = randomColor();
		while (colorWord == colorElement.innerHTML) {
			colorWord = randomColor();
		}
		if (correspondingSequence[counter] == 1) {
			colorColor = randomColor();
			while (colorColor == colorWord) {
				colorColor = randomColor();
			}
		} else {
			colorColor = colorWord;
		}
		colorElement.innerHTML = colorWord;
		colorElement.style.color = colorColor;
		time = Date.now();
	} else if (color == "start" && juststarted) {
		dialogElement.innerHTML = "";
		colorElement.style.display = "block";
		colorElement.innerHTML = "Starting in 3"
		setTimeout(function() {
			colorElement.innerHTML = "Starting in 2"
		}, 1000);
		setTimeout(function() {
			colorElement.innerHTML = "Starting in 1"
		}, 2000);	
		setTimeout(function() {
			juststarted = false;
			colorWord = randomColor();
			if (correspondingSequence[counter] == 1) {
				colorColor = randomColor();
				while (colorColor == colorWord) {
					colorColor = randomColor();
				}
			} else {
				colorColor = colorWord;
			}
			colorElement.innerHTML = colorWord;
			colorElement.style.color = colorColor;
			time = Date.now();
		}, 3000);
	} else {
		counter -= 1; // Cancel out counter += 1, as not valid button press
	}
}

var start = function(e) {
	if (["r", "b", "y", "p", "g", "o", " "].indexOf(e.key) != -1) {
		switch (e.key) {
		    case "r":
			cycle("red");
			break;
   		    case "b":
			cycle("blue");
			break;
		    case "y":
			cycle("yellow");
			break;
		    case "p":
			cycle("purple");
			break;
		    case "g":
			cycle("green");
			break;
		    case "o":
			cycle("orange");
			break;
			case " ":
			cycle("start");
		}
	}
}
var testShow = function()
{
	primerElement.style.display = "none";
	document.body.style.transition = "background-color linear 1s";
	document.body.style.backgroundColor = "white";
	bigContainerElement.style.transition = "opacity linear 1s";
	bigContainerElement.style.opacity = 1;
	addEventListener("keypress", start);
}
document.body.style.backgroundColor = "black";
switch (window.location.href.split("#")[1]) {
	case "group1":
	primerElement.src = "./img/figure1.png";
	break;
	case "group2":
	primerElement.src = "./img/figure2.png";
	break;
}
setTimeout(testShow, 10000);
