const express = require('express')
const breads = express.Router()
const allBreads = require('../models/bread')

// INDEX
breads.get('/', (req, res) => {
  res.send(allBreads)
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  res.send(allBreads[req.params.arrayIndex])
})


module.exports = breads
