const express = require('express')
const app = express()
const port = 3000

// body-parser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Cấu hình đường dẫn tĩnh
app.use(express.static('public'))

// Gọi ejs
app.set('view engine', 'ejs')

// Gọi control
app.use('/', require('./configs/controls'))

// Gọi DB
require('./configs/database')

app.listen(port, () => console.log(`Example app listening on port ${port}!`))