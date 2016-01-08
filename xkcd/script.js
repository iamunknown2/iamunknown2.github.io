function getImageUrl(number)
{
	var stringInt = number.toString();
	var url = "https://xkcd.com/" + stringInt + "/" + "info.0.json"
	var object = JSON.parse($.get({url: url, success: function(data){return data;}}));
	return object;
}
console.log(getImageUrl(1338));
