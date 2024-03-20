/*@utor: Gercodex ©*/

/* Nota: Se puede reemplazar LlaveB o llaveA siempre que no se repitan sus elementos.*/
/* A considerar: combinación o cambio de llaves por iteraciones, guardar secuencia de combinaciones de llaves; realizar aleatoriamente y guardar secuencia de llaves.*/

// const llaveA = ["ie","nte","oisv","onc","zkd","oi","erp","x","ous","z","jo","am", "os", "fl"];  /* personalizado descomentar */
// const llaveB = ["ao","ie","i","oa","u","ei","e","ea","sx","men","a","o", "la m", "mu"];

const llaveA = ["ai","enter","imes","ober","ufat"]; /*comentar para personalizado */
const llaveB = ["a","e","i","o","u"];
let cat = false;
let catTemp = 0;

function cajaDe(ide){
    return document.querySelector("#"+ide);
}

function inicio(){    
    let texto = cajaDe("texto-a-encriptar"); 
    if(window.screen.availWidth <= 375){        
        texto.addEventListener("input",tipear);
        tipearResultado = ()=>{masAltura("texto-resultado",432);};
        tipear();
        tipearResultado();
        }else{
        texto.removeEventListener("input",tipear);
        tipearResultado = ()=>{};
        texto.style="height:''";
        cajaDe("texto-resultado").style="height:''";
    }
}

function masAltura(ide,maxh){
    let h = cajaDe(ide);    
    let hc = h.clientHeight;
    let hs = h.scrollHeight;        
    if(hs != hc && hs <= maxh){                
        h.style.height = h.scrollHeight + "px";                
    }else if(hs > maxh){
        h.style.height = maxh + "px";                
    }else{
        if(capturar() == ''){            
            h.style="height:''";
        }
    }
}

function tipear(){
    masAltura("texto-a-encriptar",624);
}

function tipearResultado(){      
        
}

function capturar(){ 
    return cajaDe("texto-a-encriptar").value;
}

function escribir(texto){
    cajaDe("id-mensaje").style.display="none";
    cajaDe("id-resultado").style.display="block";
    cajaDe("texto-resultado").value = texto;
}

function sinTexto(){
    cajaDe("id-mensaje").style.display="block";
    cajaDe("id-resultado").style.display="none";
    cajaDe("texto-resultado").value = "";
}

function validar(texto){    
    return /[^a-z !]/.test(texto); 
}

function convertirToArreglo(texto){ 
    return texto.split('');
}

function getLlave(termino){ 
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

function intercambioDe(llave){
    let temp = [];
    let tempi = [];
    let resTemp = "";
    let capturado = capturar();
     if(capturado != ""){
        if(!validar(capturado)){
            let arreglo = convertirToArreglo(capturado);
            for(let i = 0; i < arreglo.length; i++){                                
                for(let k = 0; k < llave.length; k++){
                    temp = convertirToArreglo(llave[k]);                   
                    if(!llave[k].indexOf(arreglo[i])){                    
                        for(let j = 0; j < temp.length; j++){
                            if(arreglo[i + j] == temp[j]){
                                tempi.push(arreglo[i + j]);                               
                            }
                        }
                        tempi = tempi.toString().replace(/,/g,'');
                        if(tempi == llave[k]){                            
                            if(resTemp.length < tempi.length){
                                resTemp = tempi;
                            }
                        }                        
                        tempi = [];                                                
                    }
                }            
                if(resTemp.length > 0){
                    arreglo.splice(i,resTemp.length,getLlave(resTemp));                                        
                }    
                resTemp = "";
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

function encriptar(){
    intercambioDe(llaveB);  
    tipearResultado();   
    return;
}

function desencriptar(){
    intercambioDe(llaveA);        
    tipearResultado();
    return;
}

function copiarAPortapapeles(){ 
    let resultado = cajaDe("texto-resultado");    
    resultado.select();    
    navigator.clipboard.writeText(resultado.value);
    alert("Copiado");
}

function cambiar(tema){
    let doc = cajaDe("colores-tema");
    doc.setAttribute("href",tema+".css");    
}

function catFrameA(){
    let frame = cajaDe("catImg");
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
}

function catFrame(){
    cat = true;
    let ba = cajaDe("idencriptar");
    ba.addEventListener("click", catFrameA);    
    let bb = cajaDe("idesencriptar");
    bb.addEventListener("click", catFrameA);
    let bc = cajaDe("idcopiar");
    bc.addEventListener("click", catFrameA);
}
function catFrameRemove(){
    if(cat == true){
        let ba = cajaDe("idencriptar");
        ba.removeEventListener("click", catFrameA);    
        let bb = cajaDe("idesencriptar");
        bb.removeEventListener("click", catFrameA);
        let bc = cajaDe("idcopiar");
        bc.removeEventListener("click", catFrameA);        
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
    let nav = cajaDe("idnav");
    nav.style="top:"+dist+";";
}

function desactivatip(){
    let tip = cajaDe("idcajatip");
    tip.style="display:none";
    showNav("''");
}

inicio();
window.setTimeout(desactivatip, 5000);
showNav("-40px");




