/*@utor: Gercodex ©*/

/* Notas: Se puede reemplazar LlaveB por una combinación de dos o más letras siempre que no se repita, se puede usar combinaciones similares siempre que exista alguna diferencia*/
/* A considerar: combinación o cambio de llaves por iteraciones, guardar secuencia de combinaciones de llaves; realizar aleatoriamente y guardar secuencia de llaves. Cambiar tamaño de area de texto dinámicamente conforme se escriba.*/

const llaveA = ["ai","enter","imes","ober","ufat"];
const llaveB = ["a","e","i","o","u"];
let cat = false;
let catTemp = 0;

function inicio(){
    // console.log("c");
    let areatexto = document.getElementById("texto-a-encriptar"); 
    if(window.screen.availWidth <= 375){        
        areatexto.addEventListener("input",tipear);
        tipearResultado = ()=>{masAltura("texto-resultado",432);};
        tipear();
        tipearResultado();
        }else{
        areatexto.removeEventListener("input",tipear);
        tipearResultado = ()=>{};
        areatexto.style="height:''";
        document.getElementById("texto-resultado").style="height:''";
    }
}

function masAltura(ide,maxh){
    let h = document.getElementById(ide);    
    let hc = h.clientHeight;
    let hs = h.scrollHeight;        
    // console.log(hs);
    // console.log(hc);    
    // console.log("actual "+h.style.height);    
    if(hs != hc && hs <= maxh){                
        h.style.height = h.scrollHeight + "px";                
    }else if(hs > maxh){
        h.style.height = maxh + "px";                
    }else{
        if(capturar() == ''){
            // console.log("vacio");
            h.style="height:''";
        }
    }
}

function tipear(){
    masAltura("texto-a-encriptar",624);
}

function tipearResultado(){      
        
}

function capturar(){ /*captura el texto del contenedor*/
    return document.getElementById("texto-a-encriptar").value;
}

function escribir(texto){
    document.getElementById("id-mensaje").style.display="none";
    document.getElementById("id-resultado").style.display="block";
    document.getElementById("texto-resultado").value = texto;

    // console.log(window.screen.availWidth);
    //let areatexto = document.getElementById("texto-a-encriptar"); /*cambia tamaño de area de texto*/        
    // if((window.screen.availWidth <= 375) && (areatexto.value != '')){        
    //     areatexto.style.height="624px"
    // }    
}

function sinTexto(){
    document.getElementById("id-mensaje").style.display="block";
    document.getElementById("id-resultado").style.display="none";
    document.getElementById("texto-resultado").value = "";
    // if((window.screen.availWidth <= 375) && (document.getElementById("texto-a-encriptar").value == '')){
    //     document.getElementById("texto-a-encriptar").style.height="235px"
    // }
}

function validar(texto){    
    return /[^a-z !]/.test(texto); /*si es válido regresa si no termina*/
}

function convertirToArreglo(texto){    /*devuelve el arreglo de la cadena de texto*/
    return texto.split('');
}

function getLlave(termino){ /*devuelve el término o llave*/ 
    let res = "";
    let encriptadas = llaveA
    let aEncriptar = llaveB
    for(let i = 0; i < aEncriptar.length; i++){
        if(termino == aEncriptar[i]){
            res = encriptadas[i];
            break;
        }else if(termino == encriptadas[i]){
            res = aEncriptar[i];
            break;
        }else{
            res = 0;
        }
    }
    return res;
}

function getTermino(arreglo, indice, llave){
    let res = -1;
    let temp = [];
    let contador = [];    
    for(let i = 0; i < llave.length; i++){   /*recorre llaves */
        temp = convertirToArreglo(llave[i]);  /*recorre determinada llave */      
        for(let j = 0; j < temp.length; j++){   /*recorre caracteres de llave */
            if(arreglo[indice + j] == temp[j]){  /*compara char a char de arreglo */                                                    
                contador.push(temp[j]);     /* guarda coincidencias */ 
                if(contador.length == temp.length){
                    res = contador.toString().replace(/,/g, '');  /* = llave == mayor */                  
                    contador = [];     // borra para testear siguiente                   
                }  
            }else{                   
                break;      /* temina for si no coincide termino*/
            }
        }                
    }
    if(res.length > 0){   //modifica e imprime resultado
        arreglo.splice(indice,res.length,getLlave(res));
    }
    // console.log(arreglo);
    return;
}

function encAmbivalente(llave){   //recorre cada letra del area de texto    
    let capturado = capturar();
    if(capturado != ""){
        if(!validar(capturado)){
            let arreglo = convertirToArreglo(capturado);
            for(let i = 0; i < arreglo.length; i++){
                getTermino(arreglo,i,llave);        
            }
            escribir(arreglo.toString().replace(/,/g,''));
        }else{
            alert("Sólo letras minúsculas y sin acentos");   
        }
    }else{
        sinTexto();
    }
    return;
}

function desencriptar(){
    encAmbivalente(llaveA);        
    tipearResultado();
    return;
}

function encriptar(){
    encAmbivalente(llaveB);  
    tipearResultado();   
    return;
}

function copiarAPortapapeles(){ /* *********** <- "Basado en w3s. " +++++++++++ */
    let resultado = document.getElementById("texto-resultado");    
    resultado.select();    
    navigator.clipboard.writeText(resultado.value);
    alert("Copiado");
}

function cambiar(tema){
    let doc = document.getElementById("colores-tema");
    doc.setAttribute("href",tema+".css");    
}

function catFrameA(){
    let frame = document.getElementById("catImg");
    let aleatorio;
    while(1){
        aleatorio = parseInt(Math.random() * 3);            
        if(catTemp != aleatorio){
            catTemp = aleatorio;
            break;
        }    
    }
    if(aleatorio == 0){
        frame.style="content: url(imgs/gatoAColor.png)";                
    }else if(aleatorio == 1){
        frame.style="content: url(imgs/gatoBColor.png)";
    }else if(aleatorio == 2){
        frame.style="content: url(imgs/gatoCColor.png)";
    }
    
    // console.log(aleatorio);
    // let frame = document.getElementById("catImg");
    // frame.style="content: url(imgs/gatoC.png)";
}

function catFrame(){
    cat = true;
    let ba = document.getElementById("idencriptar");
    ba.addEventListener("click", catFrameA);    
    let bb = document.getElementById("idesencriptar");
    bb.addEventListener("click", catFrameA);
    let bc = document.getElementById("idcopiar");
    bc.addEventListener("click", catFrameA);
}
function catFrameRemove(){
    if(cat == true){
        let ba = document.getElementById("idencriptar");
        ba.removeEventListener("click", catFrameA);    
        let bb = document.getElementById("idesencriptar");
        bb.removeEventListener("click", catFrameA);
        let bc = document.getElementById("idcopiar");
        bc.removeEventListener("click", catFrameA);
        // alert("limpio");
        cat = false;
    }
}
function temaOriginal(){
    cambiar("original");    
    catFrameRemove();
}
function temaOscuro(){
    cambiar("oscuro");
    catFrameRemove();
}
function temaCyber(){
    cambiar("cyber");
    catFrameRemove();    
}
function temaCat(){
    cambiar("cat");
    catFrame();
}

function showNav(dist){
    let nav = document.getElementById("idnav");
    nav.style="top:"+dist+";";
}

function desactivatip(){
    let tip = document.getElementById("idcajatip");
    tip.style="display:none";
    showNav("''");
}

inicio();
window.setTimeout(desactivatip, 5000);
showNav("-40px");




