const sample = array => array[Math.floor(Math.random() * array.length)]

const withBaseURL = (config, baseURL) => Object.assign(Object.create(null), config, { baseURL })

module.exports = config => {
  const baseURL = config.baseURL
  if (typeof baseURL === 'string') {
    const baseURLs = baseURL.split(',')
    if (baseURLs.length > 1) {
      return withBaseURL(config, sample(baseURLs))
    }
  } else if (Array.isArray(baseURL)) {
    return withBaseURL(config, sample(baseURL))
  }

  return config
}
