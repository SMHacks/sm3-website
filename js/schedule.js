var satTimes = document.getElementsByClassName('sat-time');
var satEvents = document.getElementsByClassName('sat-event');
var sunTimes = document.getElementsByClassName('sun-time');
var sunEvents = document.getElementsByClassName('sun-event');
var tableRows = document.getElementsByClassName('tr');
var i = 0;

function plusDivs(n) {
	i += n;
	if (i < 0) {
		i = 0;
	}
	else if (n == 1 && i < satTimes.length + sunTimes.length) {
		tableRows[i - 1].className = tableRows[i - 1].className.replace(" active", "");
		tableRows[i].className += " active";
		
	}
	else if (n == -1) {
		tableRows[i + 1].className = tableRows[i + 1].className.replace(" active", "");
		tableRows[i].className += " active";
	}
	showContent();
}

function showContent() {
	if (i < satTimes.length) {
		document.getElementById('event').innerHTML = satEvents[i].innerHTML;
		document.getElementById('time').innerHTML = 'Saturday, ' + satTimes[i].innerHTML;
		viewSat();
	}
	else if (i >= satTimes.length && i < satTimes.length + sunTimes.length) {
		document.getElementById('event').innerHTML = sunEvents[i - satEvents.length].innerHTML;
		document.getElementById('time').innerHTML = 'Sunday, ' + sunTimes[i - satTimes.length].innerHTML;
		viewSun();
	}
	else if (i >= satTimes.length + sunTimes.length) {
		i = satTimes.length + sunTimes.length - 1;
	}
}

function viewSun() {
	$('#scheduleSun').show();
	$('#scheduleSat').hide();
}

function viewSat() {
	$('#scheduleSun').hide();
	$('#scheduleSat').show();	
}

$(document).ready(function(){
	$('#scheduleSun').hide();
	$('#viewSun').click(function() {
		viewSun();
		tableRows[i].className = tableRows[i].className.replace(" active", "");
		i = satTimes.length;
		tableRows[i].className += " active";
		showContent();
	})
	$('#viewSat').click(function() {
		viewSat();
		tableRows[i].className = tableRows[i].className.replace(" active", "");
		i = 0;
		tableRows[i].className += " active";
		showContent();
	})
})