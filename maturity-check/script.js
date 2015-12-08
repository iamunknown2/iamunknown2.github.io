function search(string, substring)
{
	return string.indexOf(substring);
}

function wotsize(string) // WOT stands for wall of text
{
	if (occur(string, "\n") !== 0)
	{
		return string.length / occur(string, "\n");
	}
	else
	{
		return string.length;
	}
}

function dummy(length)
{
	var dummyString = "";
	for (var x = 0; x < length; x++)
	{
		dummyString += "/";
	}
	return dummyString;
}
// Above code will return dummy string with the length specified in the parameter

function badCases(string)
{
	var puncList = [".", "!", "?", "'", "\"", ":", ";"];
	var capsExceptions = ["AMA", "GTG", "OK", "IIRC", "TTYL"]; // You can get away with all-caps-ing these...
	var necPuncList = [".", "!", "?"]; // You MUST put a capital after these punctuation marks.
	for (var i = 0; i < capsExceptions.length; i++)
	{
		if (search(string, capsExceptions[i]) === 0)
		{
			string = string.replace(capsExceptions[i], dummy(capsExceptions[i].length));
		}
		var acronyms = new RegExp(capsExceptions[i] + " | " + capsExceptions[i]);
		string = string.replace(acronyms, dummy(capsExceptions[i].length));
	// This will replace the strings with equally long "dummies"
	}
	newString = string.replace(/ /g, "");
	var badUpAmount = 0;
	var badLowAmount = 0;
	for (var i = 1; i < newString.length; i++) // Starting at item 1, since proper punctuation is good.
	{
		var character = newString[i];
		var upException = puncList.indexOf(newString[i - 1]) !== -1;
		var upNecessity = necPuncList.indexOf(newString[i - 1]) !== -1;
		if (character.toUpperCase() == character && character.match(/^[A-z]+$/) && !upException) // If caps + caps are not warranted
		{
			badUpAmount += 1;
		}
		else if (character.toLowerCase() == character && character.match(/^[A-z]+$/) && upNecessity) // If caps are necessary + no caps
		{
			badLowAmount += 1;
		}
	}
	return badUpAmount + badLowAmount; // Return total of "bad" amounts.
}

function repeatLetters(string)
{
	var repeatPenalty = 0;
	var streak = 0; // The more repeat letters you have in a row, the bigger the penalty will be per letter.
	for (var i = 3; i < string.length; i++)
	{
		if (string[i] == string[i - 1] && string[i - 1] == string[i - 2] && string[i - 2] == string[i - 3] && (string[i].match(/^[A-z]+$/) || string[i] == "."))
		{
			streak += 1;
			repeatPenalty += streak;
		}
		else
		{
			streak = 0; // Reset the streak if they stop repeating.
		}
	}
	return repeatPenalty;
}

function occur(string, character)
{
	var charamount = 0;
	for (var i = 0; i < string.length; i++)
	{
		if (string[i] == character)
		{
			charamount += 1;
		}	
	}
	return charamount;
}

function isNoRepeat(character)
{
	return character == "!" || character == "?" || character == " ";
}

function isNoFollow(character)
{
	var noFollowListPunc = [",", ".", "!", "?"];
	return search(noFollowListPunc, character) !== -1;
}

function badPunctuation(string)
{
	var streak = 0;
	var repeatPenalty = 0;
	for (var i = 1; i < string.length; i++)
	{
		if (isNoRepeat(string[i]) && isNoRepeat(string[i - 1]))
		{
			streak += 1;
			repeatPenalty += streak;
		}
		else
		{
			streak = 0;
		}
	}
	var followPenalty = 0;
	for (var i = 0; i < string.length; i++)
	{
		if (isNoFollow(string[i]) && string[i + 1] !== " " && string[i + 1] !== undefined && string[i + 1] !== ".")
		{
			followPenalty += 1;
		}
	}
	return repeatPenalty + followPenalty;
}

function maturity(text)
{
	var penalty = 0;
	var strippedText = text.toLowerCase().replace(/ /g, ""); // Converts all to lowercase, then removes all spaces
	var badCase = badCases(text);
	// Above code is for determining the amount of unnecessary capitals and neglected but necessary capitals
	var badPunc = badPunctuation(text);
	var badRepeat = repeatLetters(text);
	// Above code is for determining the amount of "bad" marks
	if (wotsize(text) > 400)
	{
		penalty += 0.2; // More than 400 characters/paragraph is too much
	}
	// Above code is for adding penalty for wall of text
	var indexlist = ["ban", "takedown", "takesdown", "fightfor", "ihate"];
	for (var i = 0; i < indexlist.length; i++)
	{
		{
			if (search(strippedText, indexlist[i]) !== -1)
			{
				penalty += 0.05;
			}
		}
	}
	// Above code is for adding penalties for phrases
	if (text.length !== 0)
	{
		var maturityRatio = 1 - ((badCase + badPunc + badRepeat) / text.length) - penalty; // The amount of "bad" characters per character - penalty deductions
		var maturity = maturityRatio * 100; // The maturity rating is a percentage of the maturity ratio
		if (maturity < 0)
		{
			maturity = 0;
		}
		return Math.round(maturity);
	}
}

function html_maturity()
{
	var text = document.getElementById("text").value;
	var score = document.getElementById("score");
	var display = "";
	if (isNaN(maturity(text)))
	{
		display = "Type something into the textbox..."
	}
	else
	{
		display = maturity(text).toString() + "%";
	}
	score.innerHTML = display;
	var color = "";
	if (maturity(text) >= 90)
	{
		color = "lightgreen";
	}
	else if (maturity(text) >= 66)
	{
		color = "yellow";
	}
	else if (!isNaN(maturity(text)))
	{
		color = "red";
	}
	else
	{
		color = "lightblue";
	}
	document.body.style.background = color;
}
