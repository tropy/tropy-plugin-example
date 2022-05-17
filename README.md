# tropy-plugin-example

A Tropy Plugin Boilerplate. See the included docs folder for [full documentation of the plugin system](docs/README.md), [user configuration of plugins](docs/configuration.md) and a [Getting Started tutorial](docs/tutorial.md).

## Installation

Download the `.zip` file from the [latest release](https://github.com/tropy/tropy-plugin-example/releases/latest) on GitHub.
In Tropy, navigate to *Preferences… > Plugins* and click *Install Plugin* to select the downloaded ZIP file.

## Usage

The example plugin implements the import and export hooks.
Both hooks just log that they have been called to Tropy's log file, and log the argument they are called with to the DevTools console.

## Plugin configuration

To configure the plugin, click its *Settings* button in *Preferences > Plugins*:

The example plugin has two configuration options, to demonstrate a file selector and a boolean option.
They have no effect on the plugin functionality, but their values should be logged to the DevTools console when the plugin constructor is called.

## Feedback

Missing a feature or need some more help? Please head over to the [Tropy forums](https://forums.tropy.org/) and let us know.
