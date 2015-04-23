import os
try: input = raw_input
except NameError: pass
def clearscreen():
	if (os.name == "windows"):
		os.system("cls")
	elif (os.name == "posix"):
		os.system("clear")
i = 2
primes = [2]
answer = int(input("Nth prime number (specify 'n'): "))
clearscreen()
if answer == 1:
	print("Final answer below:")
	print(2)
	input("Hit Enter/Return to exit this program now: ")
	raise SystemExit
print("Prime 1: 2")
while True:
	i += 1
	is_prime = True
	for prime in primes:
		if i % prime == 0:
			is_prime = False
	if is_prime == True:
		primes.append(i)
		if len(primes) != answer:
			print("Prime " + str(len(primes)) + ": " + str(i))
	if len(primes) == answer:
		print("")
		print("Final answer below:")
		print("")
		print(i)
		input("Hit Enter/Return to exit this program now: ")
		raise SystemExit
