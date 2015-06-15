// Start of code from http://stackoverflow.com/questions/16484884/how-do-i-get-the-how-many-days-until-my-next-birthday
// Planning to switch to "x days y hours z minutes left" instead
var oneDay = 24 * 60 * 60 * 1000; // hrs * mins * secs * ms
var oneHour = oneDay / 24
var oneMinute = oneHour / 60
var firstDate = new Date();
var secondDate = new Date(2015, 5, 27, 12, 20); // Countdown date changed
var minutes_left = Math.ceil(Math.abs((firstDate.getTime() - secondDate.getTime())/ oneMinute)); // Changed Math.round to Math.ceil here, days_left to minutes left here
// End of code from http://stackoverflow.com/questions/16484884/how-do-i-get-the-how-many-days-until-my-next-birthday
var hours_left = Math.floor(minutes_left / 60)
var days_left = Math.floor(hours_left / 24)
if (minutes_left <= 0 && minutes_left >= 1440) {
	var html = "<h2 style=\"display:inline;\">IT'S FINALLY BEGUN!</h2>\n<br>\n<iframe width=\"0\" height=\"0\" src=\"https://www.youtube.com/embed/DcwRwYcDsk4?autoplay=1&loop=1&playlist=DcwRwYcDsk4\" frameborder=\"0\"></iframe><span>(P.S song is 305 by ApproachingNirvana</span>"; // YouTube embed hack (thought of this myself). Credit to multiple sources (e.g w3schools, stackoverflow and Google Developers References) for other things, e.g autoplay.
} else if (minutes_left > 0) {
	var html = "<h3>" + days_left + " days, " + (hours_left - (24 * days_left)) + " hours and " + (minutes_left - (60 * hours_left)) + " minutes left until the holiday begins..." + "</h3>";
} else {
	var quotes = [
	"Summer is the annual permission slip to be lazy. To do nothing and have it count for something. To lie in the grass and count the stars. To sit on a branch and study the clouds. -Regina Brett",
	"Summer afternoon, summer afternoon; to me those have always been the two most beautiful words in the English language. -Henry James",
	"I love summertime more than anything else in the world. That is the only thing that gets me through the winter, knowing that summer is going to be there. -Jack McBrayer",
	"Deep summer is when laziness finds respectability. -Sam Keen",
	"Summer has filled her veins with light and her heart is washed with noon. -C. Day Lewis"
	];
	// Quotes from Brainyquote.com
	var random_choice = quotes[Math.floor(Math.random() * quotes.length)]; // Code from Jacob Relkin at http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
	var html = "<h3>" + random_choice + "</h3>"
};
document.getElementById("days_left").innerHTML = html;
