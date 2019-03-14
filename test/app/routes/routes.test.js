const router = require('../../../app/routes')

test('Router Setup', () => {

  const routes = router.stack
    .filter(layer => layer.route)
    .map(layer => layer.route.path)

  expect(routes.includes('/')).toBe(true)
})
