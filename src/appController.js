class AppController {
  constructor (ctx) {
    this.ctx = ctx
  }

  set (app) {
    this.ctx.user.hubotEngine.app = (app || this.ctx.options.app)
  }

  clear () {
    delete this.ctx.user.hubotEngine.app
  }
}

module.exports = AppController
