# Plugin configuration

Your plugin is likely to need some user-defined configuration options.
The code that controls the plugin options within Tropy is in [`src/components/plugin/option.js`](https://github.com/tropy/tropy/blob/master/src/components/plugin/option.js) in case this information seems out of date.

Although it is possible to have the user edit the `config.json` file in the Tropy plugins directory directly,
plugins can define fields that are editable via the **Plugins** preference pane.
The pane will additionally display the following `package.json` fields:

* name
* label (if not set, the GUI will display the package name)
* version
* description
* homepage

Their format is described in the [npm package.json documentation](https://docs.npmjs.com/files/package.json).

Fields for the GUI controls are defined in an `options` array in `package.json`:

```js
"options": [
  {
    "field": "fileName",
    "default": "/path/to/output.csv",
    "hint": "Please specify the location of the output file",
    "label": "Output file"
  }
]
```

* **field** defines the name you will use to access this option in your code.
In the above example, your plugin constructor will receive an `options` parameter with `fileName` set to what the user has specified.

* **type** has a default value of 'string', corresponding to a text input in the GUI, and can be omitted.
Other possibilities are `boolean` for a checkbox,
`number` for a number input,
`template` for a dropdown menu of templates,
`property` for a dropdown menu of linked data properties,
or `save-file` for a dialog to choose a file location.

* **default** defines the default value that the GUI controls will present.

* **label** is a mandatory string which appears as the label on the form field in the GUI

* **hint** is an optional string that is displayed when the cursor hovers over the label

You can also define other attributes here, such as `placeholder` and `required`, if appropriate for the type of input you have selected, and these are passed through to the form field.
