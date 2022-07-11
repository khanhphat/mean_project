const express = require('express')
const router = express.Router()

// Gọi danh sách routes
router.use('/admin/dashboard', require('../routes/R_Dashboard'))
router.use('/admin/categories', require('../routes/R_Categories'))
router.use('/admin/products', require('../routes/R_Products'))
router.use('/admin/users', require('../routes/R_Users'))

// Gọi danh sách apis
router.use('/api/categories', require('../apis/A_Categories'))
router.use('/api/products', require('../apis/A_Products'))
router.use('/api/users', require('../apis/A_Users'))

// login
router.get('/login', (req, res) => { res.render('admins/users/V_Login') })

module.exports = router