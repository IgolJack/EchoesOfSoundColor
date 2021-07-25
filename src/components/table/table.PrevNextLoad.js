import {getDataCalendar} from './table.dataGetter';
import {getTemplateCalendar} from './table.template';
import {getPreTable} from './table.template';

export function initializationTable() {
  const data = getDataCalendar(new Date())
  return getTemplateCalendar(data)
}

export function loadPrevOrNextMonth(event, context) {
  if (event.target.id === 'next') context.currentDate = getNextPrevMonth(context.currentDate)
  if (event.target.id === 'prev') context.currentDate = getNextPrevMonth(context.currentDate, false)
  if (context.cashe[context.currentDate]) {
    console.log(`Loaded data from cashe.`);
    pushDataToTable(context.cashe[context.currentDate], context)
  } else {
    const data = getDataCalendar(new Date(context.currentDate))
    context.cashe[context.currentDate] = getTemplateCalendar(data)
    pushDataToTable(context.cashe[context.currentDate], context)
  }

  putAdditionToolbar(context)
}

export function putAdditionToolbar(context) {
  const inner = context.$root.find('.innerTable')
  const dat = getPreTable(context.currentDate)
  console.log(dat);
  for (let i = 0; i <= dat.length; i++) {
    inner.$el.insertAdjacentHTML('afterbegin', dat[i]);
  }
}

function pushDataToTable(caseVersio, context) {
  context.$table.html(caseVersio)
}

function getNextPrevMonth(currentDate, next = true) {
  const year = currentDate.getFullYear()
  const month = next === true
        ? currentDate.getMonth() + 1
        : currentDate.getMonth() - 1
  return new Date(year, month)
}


