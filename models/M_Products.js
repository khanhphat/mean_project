const mongoose = require('mongoose');

// tạo cấu trúc (schema)
const productModel = mongoose.Schema({
    name: { type: String, require: true, unique: true },
    slug: { type: String, require: true,  unique: true },
    parents: { type: mongoose.Types.ObjectId, default: null },
    avatar: { type: String, default: null },
    status: { type: Boolean, default: true },
    trash: { type: Boolean, default: false },
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: null }
})

// tạo model
module.exports = mongoose.model('product', productModel)