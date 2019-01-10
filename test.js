/* eslint-env mocha */

require('should')

const http = require('http')
const axios = require('axios')

const multibase = require('.')

axios.interceptors.request.use(multibase)

const CONTENTS = ['Server 1', 'Server 2']
const SERVERS = []
const URLS = []
const REQUEST_COUNT = 10

before(() => {
  const createContentServer = content =>
    http.createServer((req, res) =>
      res.end(content))
  const listenServerUrl = server =>
    new Promise(resolve =>
      server.listen(() =>
        resolve(`http://127.0.0.1:${server.address().port}`)))

  SERVERS.push(...CONTENTS.map(createContentServer))
  return Promise.all(SERVERS.map(listenServerUrl))
    .then(urls => URLS.push(...urls))
})

after(() => {
  const closeServer = server =>
    new Promise((resolve, reject) =>
      server.close(error =>
        error == null ? resolve() : reject(error)))
  return Promise.all(SERVERS.map(closeServer))
})

it('should support baseURL array', () => {
  const requests = []
  for (let i = 0; i < REQUEST_COUNT; i += 1) {
    requests.push(axios.get('/', { baseURL: URLS }))
  }

  return Promise.all(requests).then(responses => {
    const datas = responses.map(response => response.data)
    CONTENTS.forEach(content => datas.should.containEql(content))
  })
})

it('should support baseURL string with comma separated', () => {
  const requests = []
  for (let i = 0; i < REQUEST_COUNT; i += 1) {
    requests.push(axios.get('/', { baseURL: URLS.join(',') }))
  }

  return Promise.all(requests).then(responses => {
    const datas = responses.map(response => response.data)
    CONTENTS.forEach(content => datas.should.containEql(content))
  })
})

it('should left as is without baseURL', () => {
  return axios.get(URLS[0]).then(
    response => response.data.should.equal(CONTENTS[0]))
})

it('should left as is when baseURL without comma', () => {
  return axios.get('/', { baseURL: URLS[1] }).then(
    response => response.data.should.equal(CONTENTS[1]))
})
