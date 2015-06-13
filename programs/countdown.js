// Start of code from http://stackoverflow.com/questions/16484884/how-do-i-get-the-how-many-days-until-my-next-birthday
var oneDay = 24*60*60*1000; // hrs * mins * secs * ms
var firstDate = new Date();
var secondDate = new Date(2015, 5, 26); // Countdown date changed
var days_left = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
// End of code from http://stackoverflow.com/questions/16484884/how-do-i-get-the-how-many-days-until-my-next-birthday
if (days_left <= 0) {
	var html = "<h2 style=\"display:inline;\">It's OVER!</h2>\n<br>\n<iframe width=\"0\" height=\"0\" src=\"https://www.youtube.com/embed/DcwRwYcDsk4?autoplay=1&loop=1\" frameborder=\"0\"></iframe><span>(P.S song is 305 by ApproachingNirvana</span>"; // YouTube embed hack (thought of this myself). Credit to multiple sources (e.g w3schools, stackoverflow and Google Developers References) for other things, e.g autoplay.
} else {
	var html = "<h3>" + days_left.toString() + " days left until school is over!" + "</h3>";
}
document.getElementById("days_left").innerHTML = html;
