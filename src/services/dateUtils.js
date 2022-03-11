import dayjs from "dayjs"

export const formatUTC = (date) => {
  return date.toUTCString()
}

export const getDayShort = (date) => {
  if (date) {
    let d = dayjs(date)
    return d.format('ddd')
  }
  return ""
}

export const getLtime = (date) => {
  if (date) {
    let d = dayjs(date)
    return d.format('hh:mm A')
  }
  return ""
}

export const getUTCformat = (date) => {
  
  if (date) {
    return dayjs(date).utc()
  }
  return ""
}

export const getDayMonth = (date) => {
  console.log(date)
  if (date) {
    let d = dayjs(date)
    return d.format('D')
  }
  return ""
}

export const shortDate = (date) => {
  if (date) {
    let d = dayjs(date)
    return d.format('YYYY-MM-DD')
  }
  return ""
}

export const getName = (name) => {
  if (name) {
    return name.split(" ").map((n)=>n[0]).join("").toUpperCase()
  }
  else {
    return "GS"
  }
}