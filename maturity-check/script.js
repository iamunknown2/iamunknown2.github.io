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
	var puncList = [".", "!", "?", "'", ",", "\"", "“", "”", ":", ";"];
	var capsExceptions = ["AMA", "GTG", "BRB", "OK", "AFAIK", "AFAICT", "OTOH", "FTW", "LOL", "IIRC", "TTYL", "BTW", "FTFY", "IYTAI", "MERRY CHRISTMAS", "HAPPY HOLIDAYS"]; // You can get away with all-caps-ing these...
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
	return character == "!" || character == "?" || character == " "; // These are the characters that should not be repeated consecutively
}

function isNoFollow(character)
{
	var noFollowListPunc = [",", ".", "!", "?"];
	return search(noFollowListPunc, character) !== -1;
}

function badPunctuation(string)
{
	var streak = 0; // The more consecutive punctuation marks, the bigger the penalty
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
			streak = 0; // Resets the streak if the consecutive punctuation marks stop
		}
	}
	var followPenalty = 0;
	for (var i = 0; i < string.length; i++)
	{
		if (isNoFollow(string[i]) && string[i + 1] !== " " && string[i + 1] !== undefined && string[i + 1] !== ".") // If the punctuation shouldn't be followed immediately without a space and if the next character is not a dot (to prevent from penalizing ellipsises
		{
			followPenalty += 1;
		}
	}
	return repeatPenalty + followPenalty;
}

function insults(string)
{
	var strippedString = string.toLowerCase().replace(/ /g, "");
	var insultPenalty = 0;
	var indexList = ["ban", "takedown", "takesdown", "fightfor", "ihate", "idiot", "stupid", "asdf", "hjkl"];
	for (var i = 0; i < indexList.length; i++)
	{
		var insults = new RegExp(indexList[i], "g");
		if (string.match(insults) !== null)
		{
			insultPenalty += string.match(insults).length
		}
	}
	return insultPenalty;
}

function maturity(text)
{
	var wotPenalty = 0;
	var badCase = badCases(text);
	var badPunc = badPunctuation(text);
	var badRepeat = repeatLetters(text);
	var badManners = insults(text);
	if (wotsize(text) > 400)
	{
		wotPenalty += 0.2 * Math.floor((wotsize(text) - 400) / 200); // More than 400 characters/paragraph is too much
	}
	// Above code is for adding penalty for wall of text
	// Above code is for adding penalties for phrases
	if (text.length !== 0)
	{
		var maturityRatio = 1 - ((badCase + badPunc + badRepeat + (badManners * 10) /* badManners is worst than the rest of these */) / text.length) - wotPenalty; // The amount of "bad" characters per character - penalty deductions
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
