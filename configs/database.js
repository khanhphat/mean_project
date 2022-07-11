const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mean12072021:sXgqzcenqi6tKHxt@cluster0.k5bmk.mongodb.net/mean_25_04_2022?retryWrites=true&w=majority')
.then(() => { console.log('Kết nối thành công') })
.catch((error) => { console.log(error) })