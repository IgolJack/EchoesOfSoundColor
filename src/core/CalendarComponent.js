import {DomListener} from './DomListener';

export class CalendarComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.prepare()
  }
  prepare() {

  }

  toHtml() {
  }

  init() {
    this.initDomListeners()
  }

  destroy() {

  }
}
