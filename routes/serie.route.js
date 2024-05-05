const express = require('express');
const app = express();
const serieRoutes = express.Router();

let Serie = require('../model/Serie');

// api to add serie
serieRoutes.route('/add').post(function (req, res) {
  let serie = new Serie(req.body);
  serie.save()
  .then(serie => {
    res.status(200).json({'status': 'success','mssg': 'serie added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get series
serieRoutes.route('/').get(function (req, res) {
  Serie.find(function (err, series){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','series': series});
    }
  });
});

// api to get serie
serieRoutes.route('/serie/:id').get(function (req, res) {
  let id = req.params.id;
  Serie.findById(id, function (err, serie){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','serie': serie});
    }
  });
});

// api to update route
serieRoutes.route('/update/:id').put(function (req, res) {
    Serie.findById(req.params.id, function(err, serie) {
    if (!serie){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        serie.titulo = req.body.titulo;
        serie.genero = req.body.genero;
        serie.temporadas = req.body.temporadas;
        serie.ano = req.body.ano;

        serie.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
serieRoutes.route('/delete/:id').delete(function (req, res) {
  Serie.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = serieRoutes;