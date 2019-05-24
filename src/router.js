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
}

module.exports = Router
