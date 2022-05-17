'use strict'

class ExamplePlugin {
  constructor(options, context) {
    this.options = Object.assign({}, ExamplePlugin.defaults, options)
    this.context = context
    console.log('Constructed example plugin with options and context:')
    console.log(this.options)
    console.log(this.context)
  }

  async export(data) {
    this.logger.trace('Called export hook from example plugin')
    console.log(data)
  }

  async import(payload) {
    this.logger.trace('Called import hook from example plugin')
    console.log(payload)
  }

  get dialog() {
    return this.context.dialog
  }

  get logger() {
    return this.context.logger
  }
}

ExamplePlugin.defaults = {
  clipboard: false
}

module.exports = ExamplePlugin
