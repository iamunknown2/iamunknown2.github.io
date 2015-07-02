var getprime = function() {
	var i = 1; // "i" will be the prime-tested number
	var primes = []; // This will store all primes so far
	var answer = parseInt(prompt("Nth prime number (specify 'n'): "));
	while (true) {
		i += 2; // We can eliminate all even numbers after 2
		var is_prime = true;
		for (prime in primes) {
			if (primes[prime] * primes[prime] > i){
				break;
			};
			// Above "if" branch will eliminate the primes that definitely wouldn't factorise into i.
			if (i % primes[prime] == 0) {
				is_prime = false;
				break;
			};
			// Above "if" branch will stop the prime-checking test once i is found to be a non-prime.
		};
		if (is_prime) {
			primes[primes.length] = i;
			};
		// Above "if" branch will add i to the list of primes if prime.
		if (primes.length + 1 == answer) {
			alert("\nFinal answer (Prime " + answer.toString() + "): " + i.toString() + "\n");
			break;
		};
		// Above "if" branch will show final answer.
	};
};
