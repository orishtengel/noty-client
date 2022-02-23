import dayjs from "dayjs"


export const isSameDateCustom = (date1, date2) => {
    let d1 = dayjs(date1)
    let d2 = dayjs(date2)
    return d1.format("YYYY-MM-DD") == d2.format("YYYY-MM-DD")
}

export const getDaysAhead = (startDate, count) => {
    let dates = [startDate]
    let nextDay = startDate
    for(let i = 0; i < count; i++) {
        nextDay = dayjs(nextDay).add(1, 'day')
        dates.push(nextDay.toDate())
    }
    return dates
}

export const isMorning = (date) => {
    console.log(date)
    // return date.
}

export const isEvening = (date) => {
    return !isMorning(date)
}