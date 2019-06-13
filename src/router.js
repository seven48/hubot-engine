class Router {
  constructor (robot) {
    this.robot = robot
  }

  /**
   * Wrapper for hubot `robot.respond`
   * @param {RegExp} route
   * @param {AbstractView} View
   */
  respond (route, View) {
    const view = new View(this.robot)

    this.robot.respond(
      route,
      view._onRespond
    )
  }

  /**
   * Wrapper for hubot `robot.enter`
   * @param {AbstractView} View
   */
  enter (View) {
    const view = new View(this.robot)

    this.robot.enter(view._onRespond)
  }
}

module.exports = Router
