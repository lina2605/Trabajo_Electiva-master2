const Serie = require('../models/series.js');


function createSerie(req,res){
    const newSerie = new Serie(req.body);
    newSerie.save((err,result)=>{
    if (err){
        return res.send({error: err.toString()});
    }
        return res.send(result);
    })
}

function indexSerie(req,res){
    Serie.find((err,result)=>{
        if(!result.length){
            return res.send(result);
        }
        return res.send({error: err.toString()});
    })
}

function findSerie(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
 Serie.find(query,(err,series) =>{  
     if(err){
        return res.send({error: err.toString()});
     }    
        if(!series.length){          
            return next();            
        }
        req.body.series = series;
        return next();
    })
}

function updateSerie(req,res){
    if(!req.body.series) return res.send({message: 'No se encuentra el objeto con los datos especificados'});
    let series= req.body.series[0];
    series = Object.assign(series,req.body);
    series.save().then(series=>res.status(200).send({message: 'Actualizado', series})).catch(error=>status(500).send({error})); 
}

function showSerie(req,res){
    if(!req.body.series) return res.send({message: 'No se encuentra el objeto con los datos especificados'});
    let series = req.body.series;
    return res.send({series});
}

function deleteSerie(req,res){
    if(!req.body.series) return res.send({message: 'No se encuentra el objeto con los datos especificados'});
    let series= req.body.series[0].remove().then(series => res.status(200).send({message: 'Eliminado', series})).catch(error=>status(500).send({error}));
}



module.exports.createSerie = createSerie;
module.exports.indexSerie = indexSerie;
module.exports.deleteSerie = deleteSerie;
module.exports.updateSerie = updateSerie;
module.exports.showSerie = showSerie;
module.exports.findSerie = findSerie;

