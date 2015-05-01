# refreshify-plus

> refreshify: watch mode on steroids for browserify builds
> refreshify-plus: refreshify + notifications for nonerroring builds + customizable notification title

## Features

Update any source file and your browserify bundle will be recompiled on the
spot.

### refreshify
* recompiles your browserify bundle as soon as a source file changes
* notifies you via native desktop notification if your build fails

### refreshify-plus
* notifies you via native desktop notification every time your build completes (-n --alwaysnotify)
* allows you to customize the (nonerroring) build complete notification's title (-m 'AWWW YEAH!' or --message 'Built!')

![notification](https://raw.github.com/chellberg/refreshify/master/example/notification.gif)

* live-reload built in

![live-reload](https://raw.github.com/chellberg/refreshify-plus/master/example/live-reload.gif)

* server/protocol agnostic: No need to have a local dev server, even works when files are beign served from the local file system

![protocol](https://raw.github.com/chellberg/refreshify-plus/master/example/protocol.gif)

## Example

Use `refreshify-plus` with all the same arguments as `browserify` except that
`-o` is mandatory:

```
$ refreshify-plus main.js -o static/bundle.js
```

Now as you update files, `static/bundle.js` will be automatically incrementally rebuilt on
the fly.


Enable notifications for all builds with `-n` or `--alwaysnotify`.  

Customize the notification title with `-m 'custom title here'` or `--message 'YES!'`.

`refreshify-plus -v -n -m 'AWW YEAH!'`

![custom](https://raw.github.com/chellberg/refreshify-plus/master/example/custom.png)


You can use `-v` to get more verbose output to show when a file was written and how long the bundling took (in seconds):

```
$ refreshify browser.js -d -o static/bundle.js -v
610598 bytes written to static/bundle.js  0.23s
610606 bytes written to static/bundle.js  0.10s
610597 bytes written to static/bundle.js  0.14s
610606 bytes written to static/bundle.js  0.08s
610597 bytes written to static/bundle.js  0.08s
610597 bytes written to static/bundle.js  0.19s
```

To run the example included in this repo, run `npm run example`.

## Install

With [npm](https://npmjs.org) do:

```
$ npm install -g refreshify-plus
```

to get the global `refreshify-plus` command.


## License

MIT
