import { BetterEdison } from "../../core/better-edison";

interface TimeSegment {
    from: number;
    to: number;
    cell: HTMLElement;
}

export function MySheduleBePlugin(beInstance: BetterEdison) {
    if (!beInstance.isEdison) return;

    beInstance.queryItems('.schedTable.mySchedTable', timeTable => {
        // Init time segments
        const timeTableRows = Array.from(timeTable.firstElementChild?.children || []);
        const timeCells = Array.from(timeTableRows[0].children);
        const timeSegments: TimeSegment[] = [];
        timeCells.forEach((element, i) => {
            if (i == 0) return;
            const from = element.firstChild;
            const to = element.lastChild;
            if (from && to && from.textContent && to.textContent) {
                const fromTimeSplit = from.textContent.split(':');
                const toTimeSplit = to.textContent.split(':');
                const fromTime = new Date();
                fromTime.setHours(Number(fromTimeSplit[0]));
                fromTime.setMinutes(Number(fromTimeSplit[1]));
                fromTime.setSeconds(0);
                fromTime.setMilliseconds(0);
                const toTime = new Date();
                toTime.setHours(Number(toTimeSplit[0]));
                toTime.setMinutes(Number(toTimeSplit[1]));
                toTime.setSeconds(0);
                toTime.setMilliseconds(0);

                timeSegments.push({
                    from: fromTime.getTime(),
                    to: toTime.getTime(),
                    cell: element as HTMLElement,
                });
            }
        });

        // Init line
        const rect = timeTable.getBoundingClientRect();
        const displayLine = document.createElement('div');
        timeTable.parentElement?.appendChild(displayLine);
        displayLine.classList.add('be-timetable-line');
        displayLine.style.height = rect.height + 'px';

        // Init position update
        const updatePosition = () => {
            const dateNow = new Date();
            const hours = dateNow.getHours();
            const minutes = dateNow.getMinutes();
            displayLine.setAttribute('data-time-label', `${hours}:${minutes < 10 ? '0' : ''}${minutes}`);

            const time = Date.now();
            const activeSegment = timeSegments.find(segment => segment.from <= time && segment.to >= time);
            if (!activeSegment) {
                const nextSegment = timeSegments.find(segment => segment.from > time);
                if (!nextSegment) {
                    displayLine.style.opacity = '0';
                    return;
                }
                const cellRect = nextSegment.cell.getBoundingClientRect();
                displayLine.style.left = (cellRect.left + window.scrollX) + 'px';
                displayLine.style.top = (cellRect.top + window.screenY) + 'px';
                displayLine.style.opacity = '0.5';
                return;
            }

            const cellRect = activeSegment.cell.getBoundingClientRect();
            const timeInSegment = time - activeSegment.from;
            const segmentLength = activeSegment.to - activeSegment.from;
            const positionInSegment = cellRect.width * timeInSegment / segmentLength;

            displayLine.style.left = (cellRect.left + positionInSegment + window.scrollX) + 'px';
            displayLine.style.top = (cellRect.top + window.scrollY) + 'px';
            displayLine.style.opacity = '1';


        }
        setInterval(updatePosition, 1000);
        window.addEventListener('resize', updatePosition);
        updatePosition();
    });
}
