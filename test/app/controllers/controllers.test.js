const { root } = require('../../../app/controllers/root')
const { notFound } = require('../../../app/controllers/notfound')

test('Hello World Controller', () => {
  const res = { json: jest.fn() }
  root({}, res)
  expect(res.json.mock.calls[0][0]).toEqual({ message: "Hello World" })
})

test('Not Found Route', () => {
  expect(notFound).toThrow("Route Not Found")
})
