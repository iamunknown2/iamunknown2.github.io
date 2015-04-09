#!/usr/bin/env python
# This python Code is for starting up the pagemaker/updater/branch-manager. 
import os
try: input = raw_input
except NameError: pass
def clearscreen():
	if (os.name == "windows"):
		os.system("cls")
	elif (os.name == "posix"):
		os.system("clear")
clearscreen
command = ""
answer = input("Input 'u' to start repository updater, 'p' to start page adder and 'b' to start branch-manager: ")
if (os.name == "windows"):
	if (answer == "u" or answer == "U"):
		command = "python Git_Update.py"
		clearscreen()
		os.system(command)
	elif (answer == "p" or answer == "P"):
		command = "python Git_Pages.py"
		clearscreen()
		os.system(command)
	elif (answer == "b" or answer == "B"):
		command = "python Git_Branch.py"
		clearscreen()
		os.system(command)
	else:
		input("Sorry! Your message couldn't be processed. Hit \"Return\" or \"Enter\" to exit this program: ")
elif (os.name == "posix"):
	if (answer == "u" or answer == "U"):
		command = "python ./Git_Update.py"
		clearscreen()
		os.system(command)
	elif (answer == "p" or answer == "P"):
		command = "python ./Git_Pages.py"
		clearscreen()
		os.system(command)
	elif (answer == "b" or answer == "B"):
		command = "python ./Git_Branch.py"
		clearscreen()
		os.system(command)
	else:
		input("Sorry! Your message couldn't be processed. Hit \"Return\" or \"Enter\" to exit this program: ")
raise SystemExit
