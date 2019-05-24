const routines = require('hubot-routines')

const AppController = require('./appController')

class AbstractView {
  constructor (robot) {
    this.robot = robot
    this.app = new AppController(this)

    this.options = {
      app: null,
      wrongAppMessage: 'Ты сейчас работаешь с другой командой. Сначала закончи работу с ней.',
      admin: false,
      accessDeniedMsg: 'У тебя недостаточно прав для этой команды :rolling_eyes:'
    }

    this.init(this.options)

    this._onRespond = this._onRespond.bind(this)
  }

  async _onRespond (msg) {
    this.msg = msg
    this.user = msg.message.user

    this.user.hubotEngine = this.user.hubotEngine || {}

    if (!await this._checks()) {
      return
    }

    this.callback(this.msg)
  }

  async _checks () {
    // If user app is exists and equals options app
    if (this.options.app) {
      if (this.user.hubotEngine.app && this.user.hubotEngine.app !== this.options.app) {
        this.msg.send(this.options.wrongAppMessage)
        return false
      }
    }

    if (this.options.admin) {
      if (!await routines.isAdmin(this.robot, this.user.name)) {
        this.msg.send(this.options.accessDeniedMsg)
        return false
      }
    }

    return true
  }

  init (options) { return options }

  callback (msg) { return msg }
}

module.exports = AbstractView
