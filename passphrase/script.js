function generatePassPhrase()
{
	var commonList = [];
	function resultToList(result)
	{
	}
	function ajaxFunction(callback)
	{
		$.ajax
		(
			{
				url: "./2048.txt",
				success: function(result)
				{
					callback(result);
				}
			}
		);
	}
	ajaxFunction(function(result){commonList = result.split("\n");});
	console.log(commonList);
	var word1_item = Math.floor(Math.random() * commonList.length);
	var word2_item = Math.floor(Math.random() * commonList.length);
	var word3_item = Math.floor(Math.random() * commonList.length);
	var word4_item = Math.floor(Math.random() * commonList.length);
	var word1 = commonList[word1_item];
	var word2 = commonList[word2_item];
	var word3 = commonList[word3_item];
	var word4 = commonList[word4_item];
	document.getElementById("passphrase-output").innerHTML = word1 + word2 + word3 + word4;
}
