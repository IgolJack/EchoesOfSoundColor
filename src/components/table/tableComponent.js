import {CalendarComponent} from '../../core/CalendarComponent';
import {getDataCalendar} from '@/components/table/table.dataGetter';
import {getTemplateCalendar} from '@/components/table/table.template';

export class TableComponent extends CalendarComponent {
  static className = 'calendar__table'
  constructor($root) {
    super($root, {
      name: 'TableCalendarComponent',
      listeners: ['click'],
    });
    this.currentDate
    this.cashe = {}
  }
  toHtml() {
    const data = getDataCalendar(new Date())
    return getTemplateCalendar(data)
  }

  init() {
    super.init()
    this.formateDate()
    this.$table = this.$root.find('.table')
  }

  onClick(event) {
    console.log(this.currentDate);
    if (event.target.id === 'next') {
      const date = this.getNextMonth(this.currentDate)
      if (this.cashe[date]) {
        console.log('fromCashe');
        this.$table.html(this.cashe[date])
      }
      const data = getDataCalendar(this.currentDate)
      this.currentDate = date
      this.cashe[date] = getTemplateCalendar(data)
      this.$table.html(this.cashe[date])
    } else if (event.target.id === 'prev') {
      const date = this.getPrevMonth(this.currentDate)
      if (this.cashe[date]) {
        console.log('fromCashe');
        this.$table.html(this.cashe[date])
      }
      const data = getDataCalendar(this.currentDate)
      this.currentDate = date
      this.cashe[date] = getTemplateCalendar(data)
      this.$table.html(this.cashe[date])
    }
  }

  formateDate(date = new Date()) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    this.currentDate = new Date(year, month)
  }

  getNextMonth(currentDate) {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    return new Date(year, month)
  }

  getPrevMonth(currentDate) {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() - 1
    return new Date(year, month)
  }
}
