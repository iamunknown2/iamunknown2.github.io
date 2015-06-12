// Code from http://stackoverflow.com/questions/16484884/how-do-i-get-the-how-many-days-until-my-next-birthday
var oneDay = 24*60*60*1000; // hrs * mins * secs * ms
var firstDate = new Date();
var secondDate = new Date(2015, 5, 26);
var days_left = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
var html = "<h3>" + days_left.toString() + " days left until last day of school!" + "</h3>";
document.getElementById("days_left").innerHTML = html;
