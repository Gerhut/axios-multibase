# axios-multibase

[![Build Status](https://travis-ci.org/Gerhut/axios-multibase.svg?branch=master)](https://travis-ci.org/Gerhut/axios-multibase)
[![Coverage Status](https://coveralls.io/repos/github/Gerhut/axios-multibase/badge.svg?branch=master)](https://coveralls.io/github/Gerhut/axios-multibase?branch=master)
[![dependencies Status](https://david-dm.org/Gerhut/axios-multibase/status.svg)](https://david-dm.org/Gerhut/axios-multibase)
[![devDependencies Status](https://david-dm.org/Gerhut/axios-multibase/dev-status.svg)](https://david-dm.org/Gerhut/axios-multibase?type=dev)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Multiple baseURL support for [axios](https://www.npmjs.com/package/axios).

## Install

```sh
npm install axios-multibase
```

## Usage

```JavaScript
const axios = require('axios')

axios.interceptors.request.use(multibase)

axios.get('/', {
  // Use multiple baseURLs with comma seperated:
  baseURL: 'http://host1/,http://host2/,http://host3/'
}).then(response => {
  console.log(response.data)
})

axios.get('/', {
  // Use baseURL array:
  baseURL: ['http://host1/', 'http://host2/', 'http://host3/']
}).then(response => {
  console.log(response.data)
})
```

## License

MIT
