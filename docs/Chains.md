# Chains

See `src/execute/chain-factories`

```js
const chainFactories = {
  collectEntries,
  normalizePaths,
  entryDetails,
  checkOverlap,
  filterIgnore,
  templateRenderer,
  entryToDestWriter,
  validate
}
```

## Custom chains

You can provide your own custom set of chain factories via the  `chainFactories` config option.
The built-in `execute` function looks as follows:

```js
export function execute(config: any = {}) {
  let {
    chainFactories
  } = config
  chainFactories = chainFactories || defaults.chainFactories
  const chain: any = createChain(chainFactories, config)

  return chain.collectEntries(config)
    .then(chain.normalizePaths)
    .then(chain.entryDetails)
    .then(chain.checkOverlap)
    .then(chain.filterIgnore)
    // .then(chain.actions)
    .then(chain.renderTemplates)
    .then(chain.writeToFile)
    .then(chain.validate)
}
```

We will generalize this pattern further, to make it more composable by simply iterating over the chain provided for each step.

```js
  return chain.collectEntries(config).process(chain)
```
