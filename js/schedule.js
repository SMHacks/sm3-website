let satTimes = document.getElementsByClassName('sat-time');
let satEvents = document.getElementsByClassName('sat-event');
let sunTimes = document.getElementsByClassName('sun-time');
let sunEvents = document.getElementsByClassName('sun-event');
let tableRows = document.getElementById('schedule-section').getElementsByClassName('tr');
let i = 0;

// Initial update
showContent();

/**
 * Steps the schedule forward or backward.
 * @param n        number of events to step (positive = forward, negative = backward)
 */
function stepScheduleEvent(n) {
	i += n;
	if (i < 0) {
		i = 0;
	} else if (i >= satTimes.length + sunTimes.length) {
		i = satTimes.length + sunTimes.length - 1;
	} else if (n === 1 && i < satTimes.length + sunTimes.length) {
		tableRows[i - 1].className = tableRows[i - 1].className.replace(" active", "");
		tableRows[i].className += " active";

	} else if (n === -1) {
		tableRows[i + 1].className = tableRows[i + 1].className.replace(" active", "");
		tableRows[i].className += " active";
	}
	showContent();
}

function showContent() {
	if (i < satTimes.length) {
		document.getElementById('schedule-detail-event').innerHTML = satEvents[i].innerHTML;
		document.getElementById('time').innerHTML = 'Saturday, ' + satTimes[i].innerHTML;
		viewSat();
	} else if (i >= satTimes.length && i < satTimes.length + sunTimes.length) {
		document.getElementById('schedule-detail-event').innerHTML = sunEvents[i - satEvents.length].innerHTML;
		document.getElementById('time').innerHTML = 'Sunday, ' + sunTimes[i - satTimes.length].innerHTML;
		viewSun();
	}

	if (i === 0) {
		document.getElementById('schedule-navLeft').style.visibility = 'hidden';
	} else if (i === satTimes.length + sunTimes.length - 1) {
		document.getElementById('schedule-navRight').style.visibility = 'hidden';
	} else {
		document.getElementById('schedule-navLeft').style.visibility = 'inherit';
		document.getElementById('schedule-navRight').style.visibility = 'inherit';
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

/**
 * Initializes schedule and active elements.
 */
$(document).ready(function () {
	$('#scheduleSun').hide();
	$('#viewSun').click(function () {
		viewSun();
		tableRows[i].className = tableRows[i].className.replace(" active", "");
		i = satTimes.length;
		tableRows[i].className += " active";
		showContent();
	});
	$('#viewSat').click(function () {
		viewSat();
		tableRows[i].className = tableRows[i].className.replace(" active", "");
		i = 0;
		tableRows[i].className += " active";
		showContent();
	});
});
