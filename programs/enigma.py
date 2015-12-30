import string

alphabet = string.ascii_lowercase + " "

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

def shuffle(lst):
	last = len(lst)
	new_lst = []
	for i in lst[1: last]:
		new_lst.append(i)
	new_lst.append(lst[0])
	return new_lst

def full_shuffle(rotors, cycle_count):
	rotors[11] = shuffle(rotors[11])
	if (cycle_count % 26 == 0):
		rotors[10] = shuffle(rotors[10])
	if (cycle_count % 26 ** 2 == 0):
		rotors[9] = shuffle(rotors[9])
	if (cycle_count % 26 ** 3 == 0):
		rotors[8] = shuffle(rotors[8])
	if (cycle_count % 26 ** 4 == 0):
		rotors[7] = shuffle(rotors[7])
	if (cycle_count % 26 ** 5 == 0):
		rotors[6] = shuffle(rotors[6])
	if (cycle_count % 26 ** 6 == 0):
		rotors[5] = shuffle(rotors[5])
	if (cycle_count % 26 ** 7 == 0):
		rotors[4] = shuffle(rotors[4])
	if (cycle_count % 26 ** 8 == 0):
		rotors[3] = shuffle(rotors[3])
	if (cycle_count % 26 ** 9 == 0):
		rotors[2] = shuffle(rotors[2])
	if (cycle_count % 26 ** 10 == 0):
		rotors[1] = shuffle(rotors[1])
	if (cycle_count % 26 ** 11 == 0):
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
		codetext += rotors[11][lead]
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

print(encrypt("this is a test", "abcdefghijkl", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
print(decrypt("drcvifbletfjsb", "abcdefghijkl", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
