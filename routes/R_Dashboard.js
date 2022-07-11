const express = require('express')
const router = express.Router()

// Gọi class C_Admin
const C_Admin = require('../class/C_Admin')

router.get('/index', (req, res)=>{
    // Sử dụng class C_Admin
    var use_C_Admin = new C_Admin(req.originalUrl)

    var V_Main = use_C_Admin.get_views('V_Main')
    res.render('admins/V_index', {V_Main})
})

module.exports = router