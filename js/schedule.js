// Convert all HTML collections to js arrays
let satTimes = Array.prototype.slice.call(
    document.getElementsByClassName('sat-time'), 0);
let satEvents = Array.prototype.slice.call(
    document.getElementsByClassName('sat-event'), 0);
let sunTimes = Array.prototype.slice.call(
    document.getElementsByClassName('sun-time'), 0);
let sunEvents = Array.prototype.slice.call(
    document.getElementsByClassName('sun-event'), 0);

let allTimes = satTimes.concat(sunTimes);
let allEvents = satEvents.concat(sunEvents);
let tableRows = Array.prototype.slice.call(
    document.getElementById('schedule-section')
        .getElementsByClassName('tr'), 0);
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
    } else if (i >= allTimes.length) {
        i = allTimes.length - 1;
    } else if (i < allTimes.length) {
        $(tableRows[i - n]).removeClass('active');
        $(tableRows[i]).addClass('active');
    }
    showContent();
}

function showContent() {
    // Update left panel content
    let timePrefix;
    if (i < satTimes.length) {
        timePrefix = 'Saturday, ';
        viewSat();
    } else if (i >= satTimes.length && i < satTimes.length + sunTimes.length) {
        timePrefix = 'Sunday, ';
        viewSun();
    }

    document.getElementById('schedule-detail-event').innerHTML = allEvents[i].innerHTML;
    document.getElementById('time').innerHTML = timePrefix + allTimes[i].innerHTML;

    // Remove left/right arrow if at the start/end of schedule
    let navLeft = document.getElementById('schedule-navLeft');
    let navRight = document.getElementById('schedule-navRight');

    if (i === 0) {
        navLeft.style.visibility = 'hidden';
    } else if (i === satTimes.length + sunTimes.length - 1) {
        navRight.style.visibility = 'hidden';
    } else {
        navLeft.style.visibility = 'inherit';
        navRight.style.visibility = 'inherit';
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

$('.schedule-event-div .tr').click(function () {
    // Remove prev active and set clicked to active
    $(tableRows[i]).removeClass('active');
    i = tableRows.findIndex(curRow => $(this).is(curRow));
    $(tableRows[i]).addClass('active');
    showContent();
});
