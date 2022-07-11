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

router.post('/processLogin', function (req, res) {
    // 1. khai báo
    var username=password=error='', flag=1;

    // 2. lấy dữ liệu    
    username=req.body.username;
    password=req.body.password;

    // 3. kiểm tra dữ liệu
    if(username==''){
        flag=0;
        error='Vui lòng nhập Tên Đăng Nhập';
    }

    if(password==''){
        flag=0;
        error='Vui lòng nhập Mật Khẩu';
    }

    // 4. Tổng kết
    if(flag==1){
        res.send({kq: 1, msg: 'Bạn có thể thực hiện với database'})
    }else{
        res.send({kq: 0, msg: error})
    }
})

module.exports = router