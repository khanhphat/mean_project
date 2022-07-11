const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
    res.send({kq:1, results: 'hello'})
})

router.post('/test', function (req, res) {
    var username, password;

    username=req.body.username;
    password=req.body.password;

    res.send({username, password})
})

module.exports = router