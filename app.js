
const llaveA = ["ai","enter","imes","ober","ufat"];
const llaveB = ["a","e","i","o","u"];

function capturar(){ /*captura el texto del contenedor*/
    return document.getElementById("texto-a-encriptar").value;
}

function escribir(texto){
    document.getElementById("id-mensaje").style.display="none";
    document.getElementById("id-resultado").style.display="block";
    document.getElementById("texto-resultado").value = texto;
}

function sinTexto(){
    document.getElementById("id-mensaje").style.display="block";
    document.getElementById("id-resultado").style.display="none";
    document.getElementById("texto-resultado").value = "";
}

function validar(texto){    
    return /[^a-z 0-9]/.test(texto); /*si es válido regresa si no termina*/
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
    return;
}

function encriptar(){
    encAmbivalente(llaveB);
    return;
}

function copiarAPortapapeles(){ /* *********** <- "Basado en w3s. " +++++++++++ */
    let resultado = document.getElementById("texto-resultado");    
    resultado.select();    
    navigator.clipboard.writeText(resultado.value);
    alert("Copiado");
}



