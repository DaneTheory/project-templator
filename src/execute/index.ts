import {
  chainFactories
} from './chain-factories'

export const defaults = {
  chainFactories
}

export function createChain(chainFactories: any, config: any) {
  const keys = Object.keys(chainFactories)
  return keys.reduce((acc, name) => {
    const chainFactory = chainFactories[name]
    acc[name] = chainFactory(config)
    return acc
  }, {})
}

export {
  chainFactories
}

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
