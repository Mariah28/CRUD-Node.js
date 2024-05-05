const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Serie = new Schema({
  titulo: {
    type: String
  },
  genero: {
    type: String
  },
  temporadas: {
    type: Number
  },
  ano: {
    type: Number
  }
},{
    collection: 'serie'
});

module.exports = mongoose.model('Serie', Serie);