const express = require('express')
const routes = express.Router()
const devController = require('./controllers/devController')
const searchController = require('./controllers/searchController')



routes.post('/dev',devController.create)
routes.get('/dev',devController.index)
routes.put('/dev',devController.update)
routes.delete('/dev',devController.delete)


routes.get('/search',searchController.index)

module.exports = routes