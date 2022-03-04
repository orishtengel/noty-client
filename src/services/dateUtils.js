import dayjs from "dayjs"

export const formatUTC = (date) => {
  return date.getUTCHours() + ':' + date.getUTCMinutes()
}

export const shortDate = (date) => {
  let d = dayjs(date)
  return d.format('YYYY-MM-DD')
}

export const getName = (name) => {
  if (name) {
    return name.split(" ").map((n)=>n[0]).join("").toUpperCase()
  }
  else {
    return "GS"
  }
}