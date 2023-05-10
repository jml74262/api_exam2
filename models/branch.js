const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  name:{type:String},
  manager_name:{type:String},
  latitude:{type:String},
  longitude:{type:String},
});

module.exports = Branch = mongoose.model('Branch', branchSchema);