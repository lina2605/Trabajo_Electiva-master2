const mongoose = require('mongoose');
const {Schema} = mongoose;

const seriesSchema = new Schema({
	id:{
		type: Number,
		unique: true
	},
	titulo:{
        type: String,
        required:true
    },
    director:{ 
		type: String,
		required:true
	},
	//Agregar un identificar para poder modificar bien los campos dentro del objeto
	actores:{  // objeto actores
		nombre: {
			type : String,
			
		},  
		apellidos:{
			type: String,
			
		} ,
		edad: {
			type: Number,
			
		},
		ciudad: {
			type: String,
			
		}
        //required: true
    },
    genero:{
		type: String,
		enum: ['Drama','Fantasia','Ciencia Ficcion','Comedia','Accion','Terror','Suspenso']
		//required:true 
	},
	calificacion_usuario:{
		type: String
		//required:true
	},
	resumen:{
		type: String
		//required:true
	},
	//cambiar numeroTemporada y agregar id
    temporadas:{ // objeto temporadas
        numeroTemporadas: Number,
        capitulos: Number,
        //required: true
	}
 });
 
module.exports = mongoose.model('series', seriesSchema);