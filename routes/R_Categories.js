const express = require('express')
const router = express.Router()

// Gọi class
const C_Admin = require('../class/C_Admin')
const C_Html = require('../class/C_Html')
const C_Categories = require('../class/C_Categories')

// Gọi models
const categoryModel = require('../models/M_Categories')

router.get('/index', (req, res)=>{
    // Sử dụng class C_Admin
    var use_C_Admin = new C_Admin(req.originalUrl)

    categoryModel
    .find()
    .sort({_id: -1})
    .exec((err, data)=>{
        if(err){
            res.send({kq:0, results: 'Kết nối Database thất bại'})
        }
        else{
            var use_C_Categories = new C_Categories(req.originalUrl)

            var new_array=[];

            data.forEach((e)=>{
                new_array.push({
                    _id: e._id.toString(),
                    name: e.name,
                    parents: (e.parents==null) ? '' : e.parents.toString(),
                    status: e.status,
                    date_created: e.date_created
                })
            })

            const table = use_C_Categories.get_html_table(new_array)

            var V_Main = use_C_Admin.get_views('V_Main')

            res.render('admins/V_index', {
                V_Main, table, 
                nameModule: use_C_Admin.get_name_module(),
                popupDelete: 1
            })
        }
    })
})

router.get('/add', async (req, res) => {
    // Sử dụng class
    var use_C_Admin = new C_Admin(req.originalUrl)
    var use_C_Categories = new C_Categories(req.originalUrl)

    // list categories
    var new_array=[];

    var old_array = await categoryModel.find();

    old_array.forEach(e=>{
        new_array.push({
            _id: e._id.toString(),
            parents: (e.parents==null) ? '' : e.parents.toString(),
            name: e.name,
            value: e._id
        })
    })

    const List_Categories = new_array;
    // end

    // Form
    const Array_Form = [
        {
            element: 'input', type: 'text', name: 'name', value: '',
            id: 'name', class: 'name', placeholder: 'Nhập Tên', 
            required: true, changeTitleToSlug: true},
        {
            element: 'input', type: 'text', name: 'slug', value: '',
            id: 'slug', class: 'slug', placeholder: 'Nhập Slug', 
            required: true, changeTitleToSlug: false},
        {
            element: 'select', array: List_Categories, 
            name: 'parents', id: 'parents', class: 'parents', 
            required: false, dequy: true
        }
    ]

    // Gọi html của form từ class html
    const List_Form = use_C_Categories.get_html_form(Array_Form)

    var V_Main = use_C_Admin.get_views('V_Form')
    
    res.render('admins/V_index', {
        V_Main, 
        List_Form,
        nameModule: use_C_Admin.get_name_module(),
        popupDelete: 0
    })
})

router.get('/edit/:id', (req, res) => {
    var _id = req.params.id

    categoryModel
    .find({_id})
    .exec(async (err, data)=>{
        if(err){
            res.send({kq:0, results: 'Kết nối Database thất bại'})
        }
        else{
            if(data==''){
                res.send({kq:0, results: 'Dữ liệu không tồn tại'})
            }
            else{
                // Sử dụng class
                var use_C_Admin = new C_Admin(req.originalUrl)
                var use_C_Categories = new C_Categories(req.originalUrl)

                // list categories
                var new_array=[];

                var old_array = await categoryModel.find();

                old_array.forEach(e=>{
                    new_array.push({
                        _id: e._id.toString(),
                        parents: (e.parents==null) ? '' : e.parents.toString(),
                        name: e.name,
                        value: e._id,
                        selected: data[0].parents
                    })
                })

                const List_Categories = new_array;
                // end

                // Form
                const Array_Form = [
                    {
                        element: 'input', type: 'text', name: 'name', value: data[0].name,
                        id: 'name', class: 'name', placeholder: 'Nhập Tên', 
                        required: true, changeTitleToSlug: true},
                    {
                        element: 'input', type: 'text', name: 'slug', value: data[0].slug, 
                        id: 'slug', class: 'slug', placeholder: 'Nhập Slug', 
                        required: true, changeTitleToSlug: false},
                    {
                        element: 'select', array: List_Categories, 
                        name: 'parents', id: 'parents', class: 'parents', 
                        required: false, dequy: true
                    }
                ]

                // Gọi html của form từ class html
                const List_Form = use_C_Categories.get_html_form(Array_Form)

                var V_Main = use_C_Admin.get_views('V_Form')
                res.render('admins/V_index', {V_Main, List_Form})
            }
        }
    })
})

// xử lý form
router.post('/proccessForm', function (req, res) {
    // khai báo
    var name = slug = parents = error = '', flag = 1

    // lấy dữ liệu
    name = req.body.name
    slug = req.body.slug
    parents = req.body.parents

    // kiểm tra dữ liệu
    if(name==''){
        flag=0;
        error+='Vui lòng nhập Tên, '
    }

    if(slug==''){
        flag=0;
        error+='Vui lòng nhập Slug, '
    }

    // tổng kết
    if(flag==1){
        // xử lý với db
        categoryModel
        .find({name, slug}) // check name, slug
        .exec((err, data)=>{
            if(err){
                res.send({kq:0, results: 'Kết nối Database thất bại'})
            }
            else{
                if(data==''){
                    // thêm dữ liệu
                    const obj = { name, slug, parents }

                    categoryModel
                    .create(obj, (err, data)=>{
                        if(err){
                            res.send({kq:0, results: 'Kết nối Database thất bại'})
                        }
                        else{
                            res.send({kq:1, results: 'Đã thêm thành công'})
                        }
                    })
                }
                else{
                    res.send({kq:0, results: 'Dữ liệu đã tồn tại'})
                }
            }
        })
    }
    else{
        // loại bỏ dấu , 
        res.send({kq:0, results: error.substring(0, error.lastIndexOf(", "))})
    }
})

// delete
router.post('/delete', function (req, res) {
    var _id = req.body.id;

    categoryModel
    .find({_id})
    .exec((err, data)=>{
        if(err){
            res.send({kq:0, results: 'Kết nối Database thất bại'})
        }
        else{
            if(data==''){
                res.send({kq:0, results: 'Dữ liệu không tồn tại'})
            }
            else{
                // xóa
                categoryModel
                .findByIdAndDelete({_id}, (err)=>{
                    if(err){
                        res.send({kq:0, results: 'Kết nối Database thất bại'})
                    }
                    else{
                        res.send({kq:1, results: 'Xóa thành công'})
                    }
                })
            }
        }
    })
})

module.exports = router