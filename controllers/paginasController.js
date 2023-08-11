import { Viaje } from '../models/Viajes.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async(req, res)=>{// req - lo que enviamos: res - lo que express nos responde


  const promiseDB=[];

    promiseDB.push( Viaje.findAll({limit:3}) );
    promiseDB.push( Testimonial.findAll({limit:3}) );

  try{
     const resultado = await Promise.all(promiseDB);
     
     
    res.render('Inicio',{
      pagina: "inicio",
      clase:'home',
      viajes:resultado[0],
       testimoniales: resultado[1]
    });
  }catch(error){
    console.log(error)
  }

    
 
}


const paginaNosotros = (req, res)=>{// req - lo que enviamos: res - lo que express nos responde
    // const viajes ='Viaje a Alemania';
    res.render('nosotros', {
        pagina: "Nosotros"
    });
  //res.render();
}

const paginaViajes= async (req, res)=>{// req - lo que enviamos: res - lo que express nos responde
      const viajes = await Viaje.findAll();
     
  
    res.render("viajes",{
      pagina: "Viajes",
      viajes,
    });
  //res.render();
  }

  const paginaTestimoniales= async(req, res)=>{// req - lo que enviamos: res - lo que express nos responde
    try{
      const testimoniales=await Testimonial.findAll();
      
      res.render("testimoniales",{
        pagina: "Testimoniales",
        testimoniales
      });
    }catch{
      console.log(error);
    }
    
    
 
}


//MUESTRA UN VIAJE POR SU SLUG
const paginaDetalleViaje= async(req, res)=>{
    // console.log(req.params.viaje);
    const { slug }=req.params;
    try{
      const resultado = await Viaje.findOne({where : { slug }});
      console.log(resultado);
      res.render('viaje',{
        pagina:'Información Viaje',
         resultado
      })
    }catch(error){
      console.log(error);
    }
}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}