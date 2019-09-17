createSchedule();

function createSchedule() {
    let satBody = document.getElementById('scheduleSat')
        .getElementsByTagName('tbody')[0];
    let sunBody = document.getElementById('scheduleSun')
        .getElementsByTagName('tbody')[0];

    schedule_data.sat = schedule_data.sat.sort((a, b) => a.start - b.start);
    schedule_data.sun = schedule_data.sun.sort((a, b) => a.start - b.start);

    schedule_data.sat.forEach((event, index) => {
        addRow(satBody, 'sat', event, index);
    });

    schedule_data.sun.forEach((event, index) => {
        addRow(sunBody, 'sun', event, index);
    });
}

function addRow(tableBody, dayAbbrev, scheduleEvent, scheduleIndex) {
    let startTime = scheduleEvent.start.format('h:mm A');

    let row = document.createElement('tr');
    $(row).addClass('tr');
    $(row).attr('id', `schedule-data-${dayAbbrev}-${scheduleIndex}`);
    $(row).attr('tabindex', -1);

    let rowTime = document.createElement('td');
    $(rowTime).addClass(`${dayAbbrev}-time`);
    rowTime.innerText = startTime;
    row.appendChild(rowTime);

    let rowEvent = document.createElement('td');
    $(rowEvent).addClass(`${dayAbbrev}-event`);
    rowEvent.innerText = scheduleEvent.title;
    row.appendChild(rowEvent);

    tableBody.appendChild(row);
}

$('#scheduleSat .tr').popover({
    container: 'body',
    trigger: 'focus',
    placement: 'right',
    html: true,
    content: getPopoverHTML
});

$('#scheduleSun .tr').popover({
    container: 'body',
    trigger: 'focus',
    placement: 'left',
    html: true,
    content: getPopoverHTML
});

function getPopoverHTML() {
    let cur_id = $(this).attr('id').split('-');
    let cur_eventData = schedule_data[cur_id[2]][Number.parseInt(cur_id[3])];

    let timeString = cur_eventData.start.format('dddd h:mm A');

    if (cur_eventData.start.isSame(cur_eventData.end, 'minute')) {
        // Add nothing
    } else if (cur_eventData.start.isSame(cur_eventData.end, 'day')) {
        timeString += ' - ' + cur_eventData.end.format('h:mm A');
    } else {
        timeString += ' - ' + cur_eventData.end.format('dddd h:mm A');
    }

    return `
    <h6>${cur_eventData.title}</h6>
    <p><i>${timeString}</i></p>
    <div class="schedule-popover-info">${cur_eventData.info}</div>
    `
}

$('#scheduleSat .schedule-event-div, #scheduleSun .schedule-event-div').scroll(function () {
    let rows = this.getElementsByClassName('tr');
    for (let i = 0; i < rows.length; i++) {
        let r = rows[i];
        if (!r.hasAttribute('aria-describedby')) continue;

        let popoverID = $(r).attr('aria-describedby');
        let popover = document.getElementById(popoverID);
        let popoverRect = popover.getBoundingClientRect();
        let popoverTop = popoverRect.top;
        let popoverBottom = popoverRect.bottom;

        let scrollDiv = r.closest('.schedule-event-div');
        let scrollDivRect = scrollDiv.getBoundingClientRect();
        let scrollTop = scrollDivRect.top;
        let scrollBottom = scrollDivRect.bottom;

        let offsetTop = popoverTop - scrollTop;
        let offsetBottom = popoverBottom - scrollTop;

        let isVisible = offsetTop < scrollBottom - scrollTop && offsetBottom >= 0;

        if (!isVisible) {
            $(r).popover('hide');
            $(r).blur();
            $(r).removeAttr('aria-describedby');
        }
    }

});
