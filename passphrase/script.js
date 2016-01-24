function cap(word)
{
	try
	{
		upperLetter = word[0].toUpperCase();
	}
	catch (TypeError)
	{
		upperLetter = word[0];
	}
	rest = word.slice(1);
	newWord = upperLetter + rest;
	return newWord;
}

function generatePassPhrase()
{
	var output = document.getElementById("passphrase-output");
	function message()
	{
		output.innerHTML = "Fetching list of words..."
	}
	setTimeout(message, 250);
	var commonList = [];
	$.ajax
	(
		{
			url: "./2048.txt",
			"success": function(result)
			{
				commonList = result.split("\n");
				var word1_item = Math.floor(Math.random() * commonList.length);
				var word2_item = Math.floor(Math.random() * commonList.length);
				var word3_item = Math.floor(Math.random() * commonList.length);
				var word4_item = Math.floor(Math.random() * commonList.length);
				var word1 = commonList[word1_item];
				var word2 = commonList[word2_item];
				var word3 = commonList[word3_item];
				var word4 = commonList[word4_item];
				output.innerHTML = cap(word1) + cap(word2) + cap(word3) + cap(word4);
				return "Success";
			}
		}
	);
}

function eternityGenerator()
{
	eternity = setInterval(generatePassPhrase, 10);
}

function eternityStopper()
{
	clearInterval(eternity);
}
