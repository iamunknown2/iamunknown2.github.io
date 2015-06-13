// Start of code from http://stackoverflow.com/questions/16484884/how-do-i-get-the-how-many-days-until-my-next-birthday
var oneDay = 24*60*60*1000; // hrs * mins * secs * ms
var firstDate = new Date();
var secondDate = new Date(2015, 5, 27); // Countdown date changed
var days_left = Math.ceil(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))); // Changed Math.round to Math.ceil here
// End of code from http://stackoverflow.com/questions/16484884/how-do-i-get-the-how-many-days-until-my-next-birthday
if (days_left == 0 || days_left == -1) {
	var html = "<h2 style=\"display:inline;\">IT'S FINALLY BEGUN!</h2>\n<br>\n<iframe width=\"0\" height=\"0\" src=\"https://www.youtube.com/embed/DcwRwYcDsk4?autoplay=1&loop=1&playlist=DcwRwYcDsk4\" frameborder=\"0\"></iframe><span>(P.S song is 305 by ApproachingNirvana</span>"; // YouTube embed hack (thought of this myself). Credit to multiple sources (e.g w3schools, stackoverflow and Google Developers References) for other things, e.g autoplay.
} else if (days_left > 0) {
	var html = "<h3>" + days_left.toString() + " days left until summer holiday begins..." + "</h3>";
} else {
	var quotes = ["Summer is the annual permission slip to be lazy. To do nothing and have it count for something. To lie in the grass and count the stars. To sit on a branch and study the clouds. -Regina Brett",
	"Summer afternoon, summer afternoon; to me those have always been the two most beautiful words in the English language. -Henry James",
	"I love summertime more than anything else in the world. That is the only thing that gets me through the winter, knowing that summer is going to be there. -Jack McBrayer"
	];
	// Quotes from Brainyquote.com
	var random_choice = quotes[Math.floor(Math.random() * quotes.length)]; // Code from Jacob Relkin at http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
	var html = "<h3>" + random_choice + "</h3>"
};
document.getElementById("days_left").innerHTML = html;
