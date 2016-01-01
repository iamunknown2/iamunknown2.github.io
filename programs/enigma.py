import string
try: input = raw_input
except NameError: pass

alphabet = string.ascii_lowercase + ",.!?" + " " 
rotor_count = 15

rotor1 = ["d", "g", "!", "c", "s", "x", "l", "t", "k", "u", "n", "i", "b", "q", "y", "p", "j", "e", "z", ".", "f", " ", "w", "r", "h", "m", "v", ",", "o", "a", "?"]
rotor2 = ["l", "v", "i", "d", "u", "w", " ", "o", "e", "r", "x", "j", "n", "g", "s", "c", "h", ".", ",", "m", "?", "p", "q", "!", "b", "k", "f", "a", "z", "y", "t"]
rotor3 = ["w", "i", "v", "c", "j", "l", "f", "a", "o", "k", "h", "p", "n", "m", ",", "u", "r", "x", "z", "d", "s", "e", "y", " ", "b", "t", "g", "q", "!", ".", "?"]
rotor4 = ["v", "q", "j", "d", "k", "o", "h", "t", "l", " ", "r", "p", "s", "u", "y", ",", "?", "i", "x", ".", "w", "b", "e", "n", "g", "!", "m", "a", "z", "c", "f"]
rotor5 = ["d", "v", "c", "q", ",", "!", "j", "p", "x", ".", "?", " ", "b", "h", "k", "u", "z", "e", "n", "r", "y", "w", "l", "s", "o", "t", "a", "f", "g", "i", "m"]
rotor6 = ["l", "r", "!", "j", "d", "x", "h", "p", "a", "u", "s", "m", ".", "w", "o", "k", "v", "c", "f", "t", "?", "y", "n", "e", " ", "g", "q", "z", ",", "i", "b"]
rotor7 = [".", "h", "p", "y", "k", "g", "d", "c", "t", "x", "r", "e", "q", "a", ",", " ", "u", "l", "!", "o", "b", "i", "j", "f", "n", "m", "v", "w", "z", "?", "s"]
rotor8 = ["i", "z", "m", "y", "p", "l", "w", "f", "a", "k", "q", " ", "v", "s", "e", "x", ",", "t", "!", "g", "r", "o", "j", "c", "?", ".", "h", "u", "n", "d", "b"]
rotor9 = ["r", "o", "f", ",", "m", "x", "v", "t", "l", "w", "y", "e", "j", "i", "a", "k", "u", "b", "h", "p", "q", "n", "?", " ", "c", "!", "g", "d", "z", "s", "."]
rotor10 = ["x", "w", "t", "!", "?", "d", "o", "c", ".", "h", "s", "e", "l", ",", "i", "k", "b", "m", "q", "u", "y", "n", "g", " ", "v", "j", "r", "a", "z", "p", "f"]
rotor11 = ["y", "t", "a", "m", "z", "d", "o", "!", "x", "e", "q", " ", "s", "l", "u", "i", "c", "r", "?", ".", "k", "w", "g", "b", ",", "n", "p", "j", "f", "v", "h"]
rotor12 = ["u", "z", "b", "o", "v", "h", "k", "m", "?", "c", ".", "w", "t", "q", ",", "f", "j", " ", "!", "n", "i", "r", "p", "d", "l", "g", "x", "e", "s", "y", "a"]
rotor13 = ["z", "d", "j", "s", "w", "c", "m", "p", ",", "i", "t", "y", "q", "k", "v", "u", "r", "x", "h", "o", ".", "a", "g", "b", "f", "n", "?", "!", "l", "e", " "]
rotor14 = ["x", "t", "b", "u", "f", "?", "k", "z", "v", "h", "y", "o", "n", "!", "c", "q", "r", ".", "w", "s", "e", " ", "m", "j", "d", "g", "a", "i", ",", "p", "l"]
rotor15 = ["e", "c", "r", "o", "p", "b", "i", "x", "m", "j", "?", "f", "q", "g", "s", "t", " ", "h", "l", ".", "!", "w", "u", "z", "k", "n", "y", "v", "a", ",", "d"]

def shuffle(lst):
	last = len(lst)
	new_lst = []
	for i in lst[1: last]:
		new_lst.append(i)
	new_lst.append(lst[0])
	return new_lst

def full_shuffle(rotors, cycle_count):
	for i in range(rotor_count):
		if (cycle_count % 26 ** i == 0):
			rotors[rotor_count - (i + 1)] = shuffle(rotors[rotor_count - (i + 1)])
		rotors[0] = shuffle(rotors[0])
	return rotors

def set_position(lst, letter):
	index = lst.index(letter)
	new_lst = shuffle(lst)
	for i in range(index - 1):
		new_lst = shuffle(new_lst)
	return new_lst

def encrypt(plaintext, position, order):
	rotors = []
	for i in order:
		rotors.append(globals()["rotor" + str(i)])
	for i in range(len(rotors)):
		rotors[i] = set_position(rotors[i], position[i])
	lead = ""
	codetext = ""
	cycle_count = 0
	for i in plaintext.lower():
		cycle_count += 1
		lead = alphabet.index(i)
		for x in rotors:
			lead = alphabet.index(x[lead])
		codetext += rotors[rotor_count - 1][lead]
		rotors = full_shuffle(rotors, cycle_count)
	return codetext

def decrypt(codetext, position, order):
	rotors = []
	for i in order:
		rotors.append(globals()["rotor" + str(i)])
	for i in range(len(rotors)):
		rotors[i] = set_position(rotors[i], position[i])
	lead = ""
	plaintext = ""
	cycle_count = 0
	for i in codetext.lower():
		rotors.reverse()
		cycle_count += 1
		lead = rotors[0].index(i)
		for x in rotors:
			lead = x.index(alphabet[lead])
		plaintext += alphabet[lead]
		rotors.reverse()
		rotors = full_shuffle(rotors, cycle_count)
	return plaintext

action = input("(e) Encrypt or (d) decrypt?\n")
if (action.lower() == "e"):
	plaintext = input("Enter plaintext to encrypt\n")
	position = input("Enter position (any combination of 15 alphabet letters or spaces/periods/commas/exclamation marks/question marks)\n")
	order = input("Enter order as list (1 2 ... all the way to 15, but scrambled up)\n").split()
	print(encrypt(plaintext, position, order))
if (action.lower() == "d"):
	codetext = input("Enter codetext to decrypt\n")
	position = input("Enter position\n")
	order = input("Enter order as list (1 2 ... all the way to 15, but scrambled up)\n").split()
	print(decrypt(codetext, position, order))
