var alphabet = "abcdefghijklmnopqrstuvwxyz,.!? ";
var rotor_count = 15;

var rotor1 = ["d", "g", "!", "c", "s", "x", "l", "t", "k", "u", "n", "i", "b", "q", "y", "p", "j", "e", "z", ".", "f", " ", "w", "r", "h", "m", "v", ",", "o", "a", "?"];
var rotor2 = ["l", "v", "i", "d", "u", "w", " ", "o", "e", "r", "x", "j", "n", "g", "s", "c", "h", ".", ",", "m", "?", "p", "q", "!", "b", "k", "f", "a", "z", "y", "t"];
var rotor3 = ["w", "i", "v", "c", "j", "l", "f", "a", "o", "k", "h", "p", "n", "m", ",", "u", "r", "x", "z", "d", "s", "e", "y", " ", "b", "t", "g", "q", "!", ".", "?"];
var rotor4 = ["v", "q", "j", "d", "k", "o", "h", "t", "l", " ", "r", "p", "s", "u", "y", ",", "?", "i", "x", ".", "w", "b", "e", "n", "g", "!", "m", "a", "z", "c", "f"];
var rotor5 = ["d", "v", "c", "q", ",", "!", "j", "p", "x", ".", "?", " ", "b", "h", "k", "u", "z", "e", "n", "r", "y", "w", "l", "s", "o", "t", "a", "f", "g", "i", "m"]; var rotor6 = ["l", "r", "!", "j", "d", "x", "h", "p", "a", "u", "s", "m", ".", "w", "o", "k", "v", "c", "f", "t", "?", "y", "n", "e", " ", "g", "q", "z", ",", "i", "b"];
var rotor7 = [".", "h", "p", "y", "k", "g", "d", "c", "t", "x", "r", "e", "q", "a", ",", " ", "u", "l", "!", "o", "b", "i", "j", "f", "n", "m", "v", "w", "z", "?", "s"];
var rotor8 = ["i", "z", "m", "y", "p", "l", "w", "f", "a", "k", "q", " ", "v", "s", "e", "x", ",", "t", "!", "g", "r", "o", "j", "c", "?", ".", "h", "u", "n", "d", "b"];
var rotor9 = ["r", "o", "f", ",", "m", "x", "v", "t", "l", "w", "y", "e", "j", "i", "a", "k", "u", "b", "h", "p", "q", "n", "?", " ", "c", "!", "g", "d", "z", "s", "."];
var rotor10 = ["x", "w", "t", "!", "?", "d", "o", "c", ".", "h", "s", "e", "l", ",", "i", "k", "b", "m", "q", "u", "y", "n", "g", " ", "v", "j", "r", "a", "z", "p", "f"];
var rotor11 = ["y", "t", "a", "m", "z", "d", "o", "!", "x", "e", "q", " ", "s", "l", "u", "i", "c", "r", "?", ".", "k", "w", "g", "b", ",", "n", "p", "j", "f", "v", "h"];
var rotor12 = ["u", "z", "b", "o", "v", "h", "k", "m", "?", "c", ".", "w", "t", "q", ",", "f", "j", " ", "!", "n", "i", "r", "p", "d", "l", "g", "x", "e", "s", "y", "a"];
var rotor13 = ["z", "d", "j", "s", "w", "c", "m", "p", ",", "i", "t", "y", "q", "k", "v", "u", "r", "x", "h", "o", ".", "a", "g", "b", "f", "n", "?", "!", "l", "e", " "];
var rotor14 = ["x", "t", "b", "u", "f", "?", "k", "z", "v", "h", "y", "o", "n", "!", "c", "q", "r", ".", "w", "s", "e", " ", "m", "j", "d", "g", "a", "i", ",", "p", "l"];
var rotor15 = ["e", "c", "r", "o", "p", "b", "i", "x", "m", "j", "?", "f", "q", "g", "s", "t", " ", "h", "l", ".", "!", "w", "u", "z", "k", "n", "y", "v", "a", ",", "d"];

function shuffle(lst)
{
	if (lst !== undefined)
	{
		var last = lst.length;
		var new_lst = [];
		for (var i in lst.slice(1))
		{
			new_lst[new_lst.length] = lst.slice(1)[i];
		}
		new_lst[new_lst.length] = lst[0];
		return new_lst;
	}
}

function full_shuffle(rotors, cycle_count)
{
	for (var i = 0; i < rotor_count; i++)
	{
		if (cycle_count % Math.pow(26, i) == 0)
		{
			rotors[rotor_count - (i + 1)] = shuffle(rotors[rotor_count - (i + 1)]);
			rotors[0] = shuffle(rotors[0]);
		}
	}
	return rotors;
}

function set_position(lst, letter)
{
	var index = lst.indexOf(letter);
	var new_lst = shuffle(lst);
	for (var i = 0; i < (index - 1); i++)
	{
		new_lst = shuffle(new_lst);
	}
	return new_lst;
}

function numToLetter(plaintext)
{
	var plaintext = plaintext.replace(/1/g, "one ");
	plaintext = plaintext.replace(/2/g, "two ");
	plaintext = plaintext.replace(/3/g, "three ");
	plaintext = plaintext.replace(/4/g, "four ");
	plaintext = plaintext.replace(/5/g, "five ");
	plaintext = plaintext.replace(/6/g, "six ");
	plaintext = plaintext.replace(/7/g, "seven ");
	plaintext = plaintext.replace(/8/g, "eight ");
	plaintext = plaintext.replace(/9/g, "nine ");
	plaintext = plaintext.replace(/0/g, "zero ");
	return plaintext;
}

function encrypt(plaintext, position, order)
{
	plaintext = numToLetter(plaintext);
	plaintext = plaintext.replace(/\*/g, " ");
	var rotors = [];
	for (var i in order)
	{
		rotors.push(window["rotor" + order[i].toString()]);
	}
	for (var i = 0; i < rotors.length; i++)
	{
		rotors[i] = set_position(rotors[i], position[i]);
	}
	var lead = "";
	var codetext = "";
	var cycle_count = 0;
	for (i in plaintext.toLowerCase())
	{
		cycle_count += 1;
		lead = alphabet.indexOf(plaintext.toLowerCase()[i]);
		for (x in rotors)
		{
			lead = alphabet.indexOf(rotors[x][lead]);
		}
		codetext += rotors[rotor_count - 1][lead];
		rotors = full_shuffle(rotors, cycle_count);
	}
	codetext = codetext.replace(/ /g, "*");
	return codetext;
}

function decrypt(codetext, position, order)
{
	codetext = codetext.replace(/\*/g, " ");
	var rotors = [];
	for (var i in order)
	{
		rotors.push(window["rotor" + order[i].toString()]);
	}
	for (var i = 0; i < rotors.length; i++)
	{
		rotors[i] = set_position(rotors[i], position[i]);
	}
	var lead = "";
	var plaintext = "";
	var cycle_count = 0;
	for (var i in codetext.toLowerCase())
	{
		rotors.reverse();
		cycle_count += 1;
		lead = rotors[0].indexOf(codetext.toLowerCase()[i])
		for (var x in rotors)
		{
			lead = rotors[x].indexOf(alphabet[lead])
		}
		plaintext += alphabet[lead];
		rotors.reverse();
		rotors = full_shuffle(rotors, cycle_count);
	}
	return plaintext;
}


function encryptHTML()
{
	var text = document.getElementById("text").value;
	var position = document.getElementById("position").value;
	var order = document.getElementById("order").value.split(" ");
	document.getElementById("answer").value = encrypt(text, position, order);
}

function decryptHTML()
{
	var text = document.getElementById("text").value;
	var position = document.getElementById("position").value;
	var order = document.getElementById("order").value.split(" ");
	document.getElementById("answer").value = decrypt(text, position, order);
}
// To complete
