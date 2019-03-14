// Hello World on '/'
function root(req, res) {
  res.json({ message: 'Hello World' })
}

module.exports = {
  root
}
