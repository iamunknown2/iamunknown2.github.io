import string
try: input = raw_input
except NameError: pass

alphabet = string.ascii_lowercase + " " 
rotor_count = 15

rotor1 = ["t", "z", "l", "d", "u", " ", "y", "i", "m", "c", "f", "o", "b", "q", "r", "s", "h", "k", "e", "j", "v", "g", "a", "p", "w", "x", "n"]
rotor2 = ["p", "e", "t", "s", "m", "n", "z", "k", "d", "o", "r", "l", "x", "v", "i", "f", " ", "j", "g", "b", "c", "y", "a", "q", "h", "u", "w"]
rotor3 = ["x", "i", "g", "e", " ", "u", "s", "r", "a", "p", "d", "v", "f", "n", "h", "j", "t", "m", "l", "z", "o", "y", "w", "c", "k", "b", "q"]
rotor4 = ["d", "l", "z", "x", "c", "q", "s", "t", "e", " ", "n", "o", "a", "h", "g", "k", "f", "v", "b", "y", "p", "u", "m", "j", "i", "r", "w"]
rotor5 = ["x", "h", "s", "g", "u", "l", "w", "o", "c", "b", "t", "q", "a", "m", "k", " ", "r", "v", "f", "n", "i", "j", "y", "z", "e", "d", "p"]
rotor6 = ["g", "a", "b", "i", "o", "m", "l", "x", "y", "r", "u", "v", "q", "f", "w", "j", "s", "c", "z", "h", "t", "e", "p", "n", " ", "d", "k"]
rotor7 = ["s", " ", "h", "c", "m", "w", "q", "f", "n", "u", "l", "t", "b", "v", "g", "j", "k", "x", "o", "a", "e", "z", "p", "d", "r", "y", "i"]
rotor8 = ["f", "b", "s", "c", "i", "j", "m", "e", "g", "l", "q", "n", "a", " ", "t", "u", "o", "h", "d", "p", "w", "k", "v", "r", "z", "x", "y"]
rotor9 = ["a", "h", "j", "o", "f", "d", "r", "g", "z", "k", "n", "t", " ", "w", "v", "c", "x", "b", "s", "l", "i", "m", "p", "u", "y", "q", "e"]
rotor10 = ["t", "g", "j", "i", "l", "q", "m", "s", "p", "v", "x", "d", "a", "c", "y", "h", "o", "r", "e", "u", " ", "z", "k", "n", "w", "b", "f"]
rotor11 = ["s", "x", "n", "q", "v", "l", " ", "o", "y", "p", "z", "w", "f", "m", "r", "u", "t", "g", "c", "j", "d", "i", "k", "a", "e", "h", "b"]
rotor12 = ["j", "y", "m", "o", "f", "g", "s", "e", "k", " ", "n", "i", "w", "v", "x", "c", "h", "p", "t", "l", "u", "a", "r", "z", "b", "d", "q"]
rotor13 = ["z", "l", "g", "x", "e", "j", "s", "a", "v", "i", "c", "t", "f", "w", "b", "q", "o", "u", "r", " ", "h", "d", "k", "p", "n", "m", "y"]
rotor14 = ["o", "v", "n", "g", "m", "d", "u", "r", "f", "e", "i", "l", "x", "y", "k", "s", "a", " ", "q", "b", "t", "c", "p", "j", "h", "w", "z"]
rotor15 = ["a", "v", "n", "g", "k", "l", "q", "j", "p", "y", "m", "i", "t", "x", "w", "r", "f", "s", " ", "c", "h", "o", "z", "u", "d", "b", "e"]

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
	position = input("Enter position (any combination of 15 alphabet letters or spaces)\n")
	order = input("Enter order as list (1 2 ... all the way to 15, but scrambled up)\n").split()
	print(encrypt(plaintext, position, order))
if (action.lower() == "d"):
	codetext = input("Enter codetext to decrypt\n")
	position = input("Enter position\n")
	order = input("Enter order as list (1 2 ... all the way to 15, but scrambled up)\n").split()
	print(decrypt(codetext, position, order))
