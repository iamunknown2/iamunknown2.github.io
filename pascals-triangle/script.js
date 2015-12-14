function factorial(n)
{
	var fact = 1;
	for (var i = 1; i <= n; i++)
	{
		fact *= i;
	}
	return fact;
}

function choose(n, k)
{
	var numerator = factorial(n);
	var denominator = factorial(k) * factorial(n - k);
	return Math.round(numerator / denominator);
}

function pTriangle(uptorow)
{
	var pascalsTriangle = [];
	for (var i = 0; i <= uptorow; i++)
	{
		var tempList = [];
		for (var x = 0; x <= i; x++)
		{
			tempList[x] = choose(i, x);
		}
		pascalsTriangle[i + 1] = tempList;
	}
	return pascalsTriangle;
}

function htmlPTriangle(uptorow)
{
	var uptorow = document.getElementById("val").value;
	var pascalsTriangle = pTriangle(uptorow);
	var triangleDiv = document.getElementById("triangle");
	triangleDiv.innerHTML = "";
	for (var i = 1; i < pascalsTriangle.length; i++)
	{
		var row = pascalsTriangle[i].toString();
		var newRow = row.replace(/,/g, " ")
		triangleDiv.innerHTML += newRow + "\n<br>";
	}
}
