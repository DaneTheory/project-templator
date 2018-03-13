# Template extends

This folder will contain the logic for handling and resolving of template packages that extend one or more other template packages.

## Usage

```js
await findTemplatesFor(packageName, options)
```

Will return a result

```js
{
  moduleFilePath: '~/repos/my-project/node_modules/@company/react-src-templates'
  templatesPath: '~/repos/my-project/node_modules/@company/react-src-templates/__templates__'
  pkg: {
    // ...
    templates: {
      templatesPath: '__templates__
    }
  }
  found: true
}
```

## Strategies

The following common strategies will be built-in:

- *Npm traversal* look for a template package in the same parent folder or further up the directory tree, using npm strategy (ie. packages under `/node_modules`)
- *Cache lookup* using [sao](https://github.com/saojs/sao) conventions by default, as used by [package-retriever](https://github.com/kristianmandrup/package-retriever)
- Remote lookup and download using [package-retriever](https://github.com/kristianmandrup/package-retriever) by default

Currently only *npm traversal* is supported and not yet tested.

### Npm global modules

Change Where npm Installs Global Modules

This is a really awesome change - it has a few steps, but is really worth it. With a few commands, you can change where the npm CLI installs global modules by default. Normally, it installs them to a privileged system folder - this requires administrative access, meaning that a global install requires sudo access on UNIX-based systems.

If you change the default global prefix for npm to an unprivileged directory, for example, `~/.global-modules`, you'll not need to authenticate when you install a global module. That's one benefit - another is that globally installed modules won't be in a system directory, reducing the likelihood of a malicious module (intentionally or not) doing something you didn't want it to on your system.

To get started, we're going to create a new folder called global-modules and set the npm prefix to it:

```sh
mkdir ~/.global-modules
npm config set prefix "~/.global-modules"
```

Next, if you don't already have a file called `~/.profile`, create one in your root user directory. Now, add the following line to the `~/.profile` file:

`export PATH=~/.global-modules/bin:$PATH`

Adding that line to the `~/.profile` file will add the global-modules directory to your `PATH`, and enable you to use it for npm global modules.

Now, flip back over to your terminal and run the following command to update the `PATH` with the newly updated file:

```sh
source ~/.profile
```
