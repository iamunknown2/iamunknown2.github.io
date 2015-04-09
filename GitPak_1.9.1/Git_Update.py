#!/usr/bin/env python
# This python code is for updating your Github repository via Git (the easier way)
import os
try: input = raw_input
except NameError: pass
print("Please make sure that git is installed!")
cfg_file = open("config.txt", "r")
lines = cfg_file.readlines()
if (lines[1] == 1):
	config = 1
else:
	config = 0
cfg_file.close()
def clearscreen():
	if (os.name == "windows"):
		os.system("cls")
	elif (os.name == "posix"):
		os.system("clear")
if (config == 0):
	username = input("Please specify your username: ")
	clearscreen()
	repo = input("Please specify your repository name: ")
	clearscreen()
else:
	username = lines[2]
	repo = lines[3]
	cfg_file.close()
parentfolder = ".."
os.chdir(parentfolder)
command1 = "git clone https://github.com/" + username + "/" + repo
os.system(command1)
clearscreen()
print("Please place your files in the name of your repository, where your Git_Update is located as well.")
input("Hit RETURN/Enter to continue: ")
os.chdir(repo)
os.system("git add -A")
clearscreen()
if (config == 0):	
	message = input("Enter update notes (commit messages) here. Default commit message is \"Update\": ")
else:
	message = lines[5]
	cfg_file.close()
if message == "":
	command3 = "git commit -a -m \"Update\""
else:
	command3 = "git commit -a -m \"" + message + "\""
os.system(command3)
clearscreen()
if (config == 0):
	branch = input("What branch do you want to send/push your updates to? If you don't know what branches are, leave it blank: ")
	clearscreen()
else:
	branch = lines[4]
	cfg_file.close()
if branch == "":
	command4 = "git push -u origin master"
else:
	command4 = "git push -u origin " + branch
os.system(command4)
clearscreen()
input("The code push/upload has finished. Hit Enter/Return to exit this program now: ")
cfg_file.close()
raise SystemExit
