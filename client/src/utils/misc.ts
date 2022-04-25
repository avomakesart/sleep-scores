export function formatToHours(value: number) {
  let minutes = Number(value) % 60
  let hours = (Number(value) - minutes) / 60
  let HHMM = hours.toString() + ':' + (minutes < 10 ? '0' : '') + minutes.toString()
  return HHMM
}

export function generateRange(min: number, max: number, step: number) {
  let arr = []
  for (let i = min; i <= max; i += step) {
    arr.push(i)
  }

  return arr
}

export function formatDate(date: string) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export function roundToTwo(num: number) {
  //@ts-ignore
  return +(Math.round(num + 'e+2') + 'e-2')
}
