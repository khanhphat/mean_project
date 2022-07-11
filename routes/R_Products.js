const express = require('express')
const router = express.Router()

// Gọi class
const C_Admin = require('../class/C_Admin')
const C_Products = require('../class/C_Products')
const C_Categories = require('../class/C_Categories')

// Gọi models
const productModel = require('../models/M_Products')
const categoryModel = require('../models/M_Categories')

router.get('/index', (req, res)=>{
    // Sử dụng class C_Admin
    var use_C_Admin = new C_Admin(req.originalUrl)

    productModel
    .find()
    .sort({_id: -1})
    .exec((err, data)=>{
        if(err){
            res.send({kq:0, results: 'Kết nối Database thất bại'})
        }
        else{
            var use_C_Products = new C_Products(req.originalUrl)

            var new_array=[];

            data.forEach((e)=>{
                new_array.push({
                    _id: e._id.toString(),
                    name: e.name,
                    status: e.status,
                    date_created: e.date_created
                })
            })

            const table = use_C_Products.get_html_table(new_array)

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
    var use_C_Products = new C_Products(req.originalUrl)

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
    const List_Form = use_C_Products.get_html_form(Array_Form)

    var V_Main = use_C_Admin.get_views('V_Form')

    res.render('admins/V_index', {
        V_Main, 
        List_Form,
        nameModule: use_C_Admin.get_name_module(),
        popupDelete: 0
    })
})

module.exports = router