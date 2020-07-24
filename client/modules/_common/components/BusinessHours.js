import React, { Fragment } from 'react'

export default props => {
    const businessHourMap = props.businessHours.sort((a, b) => a.numDayOfWeek - b.numDayOfWeek).reduce((acc, item, index) => {
        const timeLabel = (item.openTime == null && item.closeTime == null) ? 'Closed' : `${item.openTime} - ${item.closeTime}`;
        if (acc.lastLabel == timeLabel) {
            acc.labels[acc.lastIndex].daysOfWeek.push(item.dayOfWeek);
        } else {
            acc.labels[index] = { daysOfWeek: [item.dayOfWeek], label: timeLabel };
            acc.lastLabel = timeLabel;
            acc.lastIndex = index;
        }
        return acc;
    }, { lastIndex: 0, lastLabel: '', labels: {} });

    const businessHours = Object.entries(businessHourMap.labels)
        .sort((a, b) => a[0] - b[0])
        .map(entry => entry[1])
        .map(item => `${item.daysOfWeek[0]}${item.daysOfWeek.length > 1 ? ` - ${item.daysOfWeek[item.daysOfWeek.length - 1]}` : ''}: ${item.label}`)

    return (
        <div className="py-3">
            {
                businessHours.map((item, index) => {
                    return <div key={index}>
                        {item}
                    </div>
                })
            }
        </div>
    )
}