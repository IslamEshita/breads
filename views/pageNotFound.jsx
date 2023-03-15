const React = require('react')
const Default = require('./layouts/Default')

function PageNotFound () {
      return (
        <Default>
            <h2>Page Not Found!</h2>        
            <li><a href="/breads">Go home</a></li>
        </Default>
      )
  }
  
module.exports = PageNotFound
