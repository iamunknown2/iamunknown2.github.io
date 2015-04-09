#!/usr/bin/env python
# This code is for managing branches. I'll include the merge function later. 
import os
try: input = raw_input
except NameError: pass
print("Please make sure that git is installed!")
def clearscreen():
	if (os.name == "windows"):
		os.system("cls")
	elif (os.name == "posix"):
		os.system("clear")
answer1 = input("Please specify your username: ")
clearscreen()
answer2 = input("Please specify the repository: ")
clearscreen()
os.chdir("..")
command1 = "git clone https://github.com/" + answer1 + "/" + answer2
os.system(command1)
clearscreen()
answer3 = input("Input 'n' to create new branch, 'd' to delete branch, 'q' to quit, or the name of a branch to checkout/move to it: ")
clearscreen()
if (answer3.lower() == "n"):
	answer4 = input("Please input the name of your new branch: ")
	clearscreen()
	command2 = "git checkout -b " + answer4
	command3 = "git push origin " + answer4
	os.system(command2)
	os.system(command3)
	clearscreen()
	input("Branch creation finished. Hit Enter/Return to exit this program now: ")
	raise SystemExit
elif (answer3.lower() == "d"):
	while (1 == 1):
		clearscreen()
		answer5 = input("Please input the name of the branch you want to delete (can't be master): ")
		if (answer5.lower() != "master"):
			break
		input("Error: Answer cannot be 'master'! Hit Return/Enter to answer again: ")
	os.system("git checkout master")
	clearscreen()
	command4 = "git branch -d " + answer5
	os.system(command4)
	clearscreen()
	input("The branch deletion has been finished. Hit Enter/Return to exit this program now: ")
	raise SystemExit
elif (answer3.lower() == "q"):
	raise SystemExit
else:
	command5 = "git checkout " + answer3
	os.system(command5)
