#!/usr/bin/env node
'use strict'

const { isOn, toggle } = require('toggle-hotplug')
const meow = require('meow')
const shoutMessage = require('shout-message')
const updateNotifier = require('update-notifier')

const cli = meow(
  `
  Usage:
    $ hotplug <cmd>

  Example:
    $ hotplug               toggle hotplug on and off
    $ hotplug status        show hotplug status

  Options:
    -h, --help              show help options
    -v, --version           show version
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const run = async () => {
  const input = cli.input[0]

  if (input === 'status') {
    const result = await isOn()
    const status = result ? 'hotplug is `on`.' : 'hotplug is `off`.'

    return shoutMessage(status)
  }

  const result = await toggle()
  const status = `You just turned ${result ? '`on`' : '`off`'} hotplug.`

  shoutMessage(status)
}

run()
