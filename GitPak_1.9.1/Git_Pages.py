#!/usr/bin/env python
# This python code is for adding pages to your Github website (the easier way) 
import os
try: input = raw_input
except NameError: pass
print("Please make sure that git is installed!")
print("Please make sure that your repository name is username.github.io.")
print("Your repository will be stored in the directory the GitPak folder is located.")
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
else:
	username = lines[2]
	cfg_file.close()
parentfolder = ".."
os.chdir(parentfolder)
repo = username + ".github.io"
command1 = "git clone https://github.com/" + username + "/" + repo
os.chdir(repo)
os.system(command1)
clearscreen()
	pagename = input("Please specify the name of your page: ")
os.chdir(repo)
os.mkdir(pagename)
clearscreen()
print("Drop your files in the directory " + pagename + " which will be in" + repo + ".")
os.chdir(pagename)
os.system("git add -A")
clearscreen()
message = input("Enter update notes (commit messages) here. Default commit message is \"Update\": ")
if message == "":
	command2 = "git commit -a -m \"Update\""
else:
	command2 = "git commit -a -m \"" + pagename + "\""
os.system(command2)
clearscreen()
if (config == 0):
	branch = input("What branch do you want to send/push your updates to? If you don't know what branches are, leave it blank: ")
	clearscreen()
else:
	branch = lines[4]
	cfg_file.close()
if branch == "":
	command3 = "git push -u origin master"
else:
	command3 = "git push -u origin " + pagename
os.system(command3)
clearscreen()
print("Your page can be edited in the folder" + pagename + ", which in turn can be found in the directory " + repo + ".")
input("Your page can be seen at " + repo + "/" + pagename + ". Hit Enter/Return to exit this program now: ")
raise SystemExit
