const http = require('http');
 
const informacion = require('./cursos.js');
const { json } = require('stream/consumers');

const puerto = 4000;
const servidor = http.createServer((req,res)=>{
    console.log("Acabo de recibir una solicitud:");
    console.log(`La url de la petición es: ${req.url}`);
    console.log(`El método de la petición es: ${req.method}`);

    const url = req.url;
    const metodo = req.method;
    switch (url){
        case "/cursos/escolares":
            if (metodo === "GET") { 
                console.log(informacion.cursos.escolares); 
                // res.end lo manda al usuario
                res.end(JSON.stringify(informacion.cursos.escolares));
                // Se debe de mandar en formato JSON la información al usua
            }
            break;
        case "/cursos/envio":
            if (metodo === "POST"){
                manejaPost(req,res);
            }
            break;
        default:
            res.statusCode = 404; 
            res.end("Not Found");
            break;
    }
}).listen(puerto,()=>{ 
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});

function manejaPost(req,res){
    const path = req.url;
    if (path === "/cursos/envio"){
        let cuerpo = " ";
        req.on('data',(contenido)=>{
            cuerpo += contenido.toString();
        });
        req.on('end',()=>{
            console.log(cuerpo);
            console.log(typeof cuerpo);
            res.end("El servidor recibió una solicitud POST a /cursos/envio");
        })

    }
}