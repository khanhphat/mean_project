const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
    res.send({kq:1, results: 'hello'})
})

module.exports = router