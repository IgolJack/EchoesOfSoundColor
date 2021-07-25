import {CalendarComponent} from '../../core/CalendarComponent';
import {loadPrevOrNextMonth, initializationTable, putAdditionToolbar} from './table.PrevNextLoad';

export class TableComponent extends CalendarComponent {
  static className = 'calendar__table'
  constructor($root) {
    super($root, {
      name: 'TableCalendarComponent',
      listeners: ['click'],
    });
    this.currentDate
    this.cashe = {}
    this.events = {}
  }
  toHtml() {
    return initializationTable()
  }

  init() {
    super.init()
    this.formateDate()
    this.$table = this.$root.find('.table')
    putAdditionToolbar(this);
    this.$tableInput = this.$root.find('#tableInput')

    this.$tableInput.$el.defaultValue = `${this.currentDate.getFullYear()}-0${this.currentDate.getMonth() + 1}-01`
    this.$tableInput.on('blur', this.focusInput.bind(this))
  }

  onClick(event) {
    if (event.target.id === 'next' || event.target.id === 'prev') {
      loadPrevOrNextMonth(event, this)
    } else if (event.target.classList.contains('day')) {
      const $week = event.target.closest('.week')
      const $event = document.createElement('div')
      $event.classList.add('event')
      $event.innerHTML = 'event1'
      $week.appendChild($event)
    }
  }

  formateDate(date = new Date(), day = null) {
    if (day) {
      return new Date(date.getFullYear(), date.getMonth(), day || 1)
    }
    if (this.currentDate == undefined) {
      const year = date.getFullYear()
      const month = date.getMonth()
      this.currentDate = new Date(year, month)
    }
  }

  focusInput(event) {
    this.currentDate = event.target.value
    loadPrevOrNextMonth(event, this)
  }
}
