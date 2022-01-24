const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number },
    DT:{type:String},
    task:{type:String},
    desc:{type:String},
    username:{type:String},
    pwd:{type:String}
});

module.exports = { Employee };