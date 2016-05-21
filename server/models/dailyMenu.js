var mongoose = require('mongoose'),
    connection = require('../config/database');
var dailyMenuSchema = new mongoose.Schema({
    foodName: {
        type: String,
        unique: false,
        required: true
    },
    foodDescription: {
        type: String,
        required: true
    },
    foodType: { //vegan or raw
        type: String,
        required: true,
        enum: ["vegan", "raw"]
    },
    foodSort: { //predkrm, hladni, napoje, dezerty atd.
        type: String,
        required: true,
        enum: ["polevka", "hlavni"]
    },
    day: {
        type: String,
        required: true,
        enum: ['pondeli', 'utery', 'streda', 'ctvrtek', 'patek']
    },
    price: {
        type: Number,
        required: true
    }
});
/*var DailyMenu = connection.model('DailyMenu', dailyMenuSchema);

 var dmenu = new DailyMenu({
     foodName: 'first fourth pondeli',
     foodDescription: "popis",
     foodType: 'vegan',
     foodSort: 'hlavni',
     day: 'pondeli',
     price: 13
 });
 dmenu.save(function (err, dmenu) {
 if(err) return console.log(err);
 console.dir(arguments);
 console.log('inserting to db admin');
 });
*/
module.exports = dailyMenuSchema;