function prime() {
	var i = 1;
	var primes = [];
	var answer = parseInt(prompt("Nth prime number (specify 'n'): "));
	while true {
		i += 2;
		var is_prime = true;
		for (prime in primes) {
			if (primes[prime] ** 2 > i) {
				break;
			};
			if (i % prime == 0) {
				is_prime = false;
				break;
			};
		};
		if (is_prime) {
			primes[primes.length] = i;
			if (primes.length + 1 == answer) {
				alert("Prime " + toString(primes.length + 1) + ": " + i.toString());
				};
			};
		if (primes.length + 1 == answer) {
			alert("\nFinal answer (Prime " + answer.toString() + "): " + i.toString() + "\n";
		};
	};
};
