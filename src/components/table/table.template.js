export function getTemplateCalendar([data, startDate]) {
  const month = []
  month.push(`
    <h2>
        <span id="prev"><</span>
        ${startDate[0]}
        <span id="next">></span>
    </h2>`)
  month.push(`
  <div class="namesOfDays">
    <span>ПН</span>
    <span>Вт</span>
    <span>Ср</span>
    <span>Чт</span>
    <span>Пт</span>
    <span>Сб</span>
    <span>Вс</span>
  </div>`)
  for (let i = 1; i <= 6; i++) {
    month.push(getWeek(i, data))
  }
  return `<div class="table">${month.join('')}</div>`
}


function getWeek(numberOfWeek, days) {
  const week = []
  for (let i = (numberOfWeek * 7) - 7; i < numberOfWeek * 7; i++) {
    week.push(getDayCell(days[i]))
  }
  const obj = [`<div class="week">${week.join(' ')}</div>`]
  return obj.join(' ')
}


function getDayCell(date) {
  let obj = null
  if (date['key'] !== 'currentMonth') {
    obj = `<div class="day otherDays">${formatDate(date.date)}</div>`
  } else {
    obj = `<div class="day currentDays"">${formatDate(date.date)}</div>`
  }
  return obj
}

function formatDate(date) {
  return date.getDate()
}
