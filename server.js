// Bringing in required modules
const express = require('express')
const dotenv = require('dotenv')

// Configure environment variable
dotenv.config()
const PORT = process.env.PORT

// Create the express app
const app = express()

// Add routes
app.get('/', (req, res) => {
  res.send('Hello Bread CRUD app!')
})

// Listen on port
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
})
