import {getDayOfWeek} from './table.dataGetter'

export function getTemplateCalendar([data, startDate]) {
  const month = [];
  const table = [];

  for (let i = 1; i <= 6; i++) {
    table.push(getWeek(i, data, startDate))
  }

  month.push(`<tbody class="innerTable">${table.join('')}</tbody>`)
  return `<table class="table">${month.join('')}</table>`
}

function getNamesOfDays() {
  const $tr = []
  $tr.push(`<tr class="namesOfDays">
  <span>ПН</span>
  <span>Вт</span>
  <span>Ср</span>
  <span>Чт</span>
  <span>Пт</span>
  <span>Сб</span>
  <span>Вс</span>
</tr>`)
  return $tr.join('')
}

function getInput() {
  const $tr = []
  $tr.push(`<input id="tableInput" style="float: right" type="date"></input>`)
  return $tr.join('')
}

function getNameOfMothAndButtons(startDate) {
  const $tr = []
  const month = startDate.toLocaleString('default', {month: 'long'});
  $tr.push(`<span id="prev">prev</span> ${month} <span id="next">next</span>`)
  return $tr.join()
}

function getWeek(numberOfWeek, days, startDate) {
  const week = []
  for (let i = (numberOfWeek * 7) - 7; i < numberOfWeek * 7; i++) {
    week.push(getDayCell(days[i]))
  }
  const obj = [`<tr class="week">${week.join(' ')}</tr>`]
  return obj.join(' ')
}

function getDayCell(date) {
  const nameOfDay = getDayOfWeek(date.date.getDay())
  const freeDay = (nameOfDay === 6 || nameOfDay === 5) ? 'freeDay' : ''
  let obj = null
  if (date['key'] !== 'currentMonth') {
    obj = `<td data-day="${nameOfDay}" class="day otherDays ${freeDay}">${formatDate(date.date)}</td>`
  } else {
    obj = `<td data-day="${nameOfDay}" class="day currentDays ${freeDay}">${formatDate(date.date)}</td>`
  }
  return obj
}

function formatDate(date) {
  return date.getDate()
}

export function getPreTable(start) {
  const pre = [];
  pre.push(document.createElement('tr').innerHTML = (`<tr class ="buttons-month">${getNameOfMothAndButtons(start)} </tr>`));
  pre.push(document.createElement('tr').innerHTML = (`<tr> ${getInput()} </tr>`));
  pre.push(document.createElement('tr').innerHTML = (`<tr> ${getNamesOfDays()} </tr>`));
  return pre
}
