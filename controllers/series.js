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
        if(err) return res.send({error: err.toString()});
        if(result.length) return res.send(result);
        return res.send("No hay elementos");      
    })
}

function updateSerie(req,res){
    let query = {};
    query[req.params.key] = req.params.value;
    //probar findAndModify
    Serie.findOneAndUpdate(query,req.body,(err,series) =>{     
    if(err) {
        return res.send({error: err.toString()});
    }
    req.body.series = series;
    if(!req.body.series) {
        return res.send({message: 'No se encuentra el objeto con los datos especificados'});
    }
    return  res.send({message: 'Actualizado', series})
    })
}
//Revisar porque no muestra el mensaje cuando no existe la consulta
function showSerie(req,res){
    let query = {};
    query[req.params.key] = req.params.value;
    Serie.find(query,(err,series) =>{     
    if(err) {
        return res.send({error: err.toString()});
    }
    req.body.series = series;
    if(!req.body.series) {
        return res.send({message: 'No se encuentra el objeto con los datos especificados'});
    }
    return res.send({series});
    })
}

function deleteSerie(req,res){
    let query = {};
    query[req.params.key] = req.params.value;
    Serie.findOneAndRemove(query,(err,series) =>{     
    if(err) {
        return res.send({error: err.toString()});
    }
    req.body.series = series;
    if(!req.body.series) {
        return res.send({message: 'No se encuentra el objeto con los datos especificados'});
    }
    return  res.send({message: 'Eliminado', series})
    })
}


/*function updateSerie(req,res){
    if(!req.body.series) {
        return res.send({message: 'No se encuentra el objeto con los datos especificados'});
    }  
    let series= req.body.series[0];
    series = Object.assign(series,req.body);
    //series.save().then(series=>res.status(200).send({message: 'Actualizado', series})).catch(error=>status(500).send({error})); 
    series.save((err,series)=>{
        if(err){
            return res.send({error: err.toString()});
        }  
        return  res.send({message: 'Actualizado', series})
    })
}*/

/*function showSerie(req,res){
    if(!req.body.series) {
        return res.send({message: 'No se encuentra el objeto con los datos especificados'});
    }
    let series = req.body.series;
    return res.send({series});
}*/


/*function deleteSerie(req,res){
    if(!req.body.series) {
        return res.send({message: 'No se encuentra el objeto con los datos especificados'});
    }
    let series = req.body.series[0].remove((err,series)=>{
        if(err){
            return res.send({error: err.toString()});
        }
        return res.send({message: 'Eliminado', series})    
    })
}*/



module.exports.createSerie = createSerie;
module.exports.indexSerie = indexSerie;
module.exports.deleteSerie = deleteSerie;
module.exports.updateSerie = updateSerie;
module.exports.showSerie = showSerie;



