# Getting Started

This tutorial will help you learn how to write a minimal Tropy plugin.
It assumes you have some familiarity with JavaScript and its ecosystem, and `git` and GitHub.

Our plugin will export only an item's title, as well as the location of its first photo, to a text file.
It is not meant to be comprehensive, but only an illustration for writing Tropy plugins.

Please refer to the [Plugin system](./README.md) page, if you need details on how it works.

## Setup

### Set up this template repository

Go to the [sample plugin repository](https://github.com/tropy/tropy-plugin-example/) and click the big green "Use this template" button to get a copy of it in your user account.
Give the new repository the name of your plugin.

Clone the repository you created to your computer, and run `npm install` to install the dependencies required for testing and building the plugin.
Then run `npm run watch` to build the plugin, and continuously update the built file as you make changes.

### Create the plugin location in Tropy

To begin, go to the *Help > Show Plugins Folder* in the Tropy menu, and note the
location. You will be creating additional files and folders within this folder.

In the `plugins` folder you just found, create a new folder called whatever you named your plugin repository.
Create symlinks from your plugin repository `package.json` and `index.js` files to this new folder you created.

Reload Tropy (*Ctrl-R* or *Cmd-R*) and go to *Preferences > Plugins* to enable your plugin.

### Scaffold the plugin functionality

In a text editor, go to `package.json` in your plugin repository, and set the `hooks` key as follows:

```json
{
  "hooks": {
    "export": true
  }
}
```

This tells Tropy that your plugin can handle exporting, so an item will appear for your plugin in the *Export* menu alongside the built-in JSON-LD and PDF export options.

Next, open  `src/plugin.js` in the new plugin repository folder, and remove the stub for the `import` method, since your plugin won't implement import.

```js
class ExamplePlugin {
  constructor(options, context) {
    this.options = Object.assign({}, ExamplePlugin.defaults, options)
    this.context = context
  }

  async export(data) {
    this.logger.trace('Called export hook from example plugin')
    console.log(data)
  }

  // ...
}
```

## Export function

Since the plugin does not yet do anything, let's add some functionality next. Open
`src/plugin.js` and change the *export* function to the following:

```js
async export(data) {
  this.logger.info('Exporting items to CSV...')
  console.log(data)
  const writeStream = require('fs').createWriteStream(this.options.file)
  for (let items of data) {
    for (let item of items['@graph']) {
      try {
        writeStream.write(`"${item.title}","${item.photo[0].path}"\n`)
      } catch (e) {
        this.logger.error(e.message)
      }
    }
  }
  writeStream.end()
}
```

Notice how we use Tropy's logger, which comes into the plugin class via the `context` parameter, and is bound to `this` further down the sample file for ease of access.
We also refer to `this.options.file`, which relates to the `file` option defined in `package.json` and is passed into the plugin class via the `options` parameter.

After any changes to the plugin code, Tropy needs to be reloaded for the changes to take effect. Make sure that rollup is still running (via `npm run watch`) to update your code changes in the built plugin.

Run your plugin's export function from the *export* menu item in Tropy.
You can also look in the Chrome DevTools console (see [developing and debugging](./README.md#developing-and-debugging)) to see the console log lines from your plugin.
These show you the arguments it was given to the constructor and the export function.

## Testing

The sample plugin repository comes with testing set up (using the [mocha](https://mochajs.org/) framework).

Go to `test/plugin_test.js` and edit the existing smoke tests to look as follows:

```js
'use strict'

const assert = require('assert')

describe('ExamplePlugin', () => {
  const ExamplePlugin = require('../src/plugin')

  it('exists', () => {
    assert.equal(typeof ExamplePlugin, 'function')
  })

  it('responds to export hook', () => {
    assert.equal(typeof (new ExamplePlugin).export, 'function')
  })

  it('does not respond to import hook', () => {
    assert.equal(typeof (new ExamplePlugin).import, 'undefined')
  })
})
```

These are some very basic smoke tests, to check that your plugin can be constructed, and has functions to respond to the hooks it should respond to.
Run the tests with `npm test`.
