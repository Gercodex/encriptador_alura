


function capturar(){ /*captura el texto del contenedor*/
    return document.getElementById("texto-a-encriptar").value;
}

function escribir(texto){
    document.getElementById("id-mensaje").style.display="none";
    document.getElementById("id-resultado").style.display="block";
    document.getElementById("texto-resultado").value = texto;
}

function validar(texto){
    /*si es válido regresa si no termina*/
    return true;
}

function convertirToArreglo(texto){    /*devuelve el arreglo de la cadena de texto*/
    return texto.split('');
}

function getLlave(termino){ /*devuelve el término o llave*/ 
    let res = "";
    let Encriptadas = ["ai","enter","imes","ober","ufat"];
    let AEncriptar = ["a","e","i","o","u"];
    for(let i = 0; i < AEncriptar.length; i++){
        if(termino == AEncriptar[i]){
            res = Encriptadas[i];
            break;
        }else if(termino == Encriptadas[i]){
            res = AEncriptar[i];
            break;
        }else{
            res = 0;
        }
    }
    return res;
}

function encriptar(){        
    // let encriptado = [];
    let temp = [];
    let tempb;
    let capturado = capturar();    
    let arreglo = convertirToArreglo(capturado);        
    for(let i = 0; i < arreglo.length; i++){ /*recorrido de arreglo */
        tempb = true;
        if(temp = getLlave(arreglo[i])){
            for(let j = 0; j < temp.length; j++){  /*término o llave */
                if(tempb){
                    arreglo.splice(i++,1,temp[j]);
                    tempb = false;
                    // console.log("ok"+i);
                }else{
                    arreglo.splice(i++,0,temp[j]);
                    // console.log("nok");
                }
            }
            i--;            
        }else{
            // console.log("no");
        }        
    }
    escribir(arreglo.toString().replace(/,/g, ""));
    // console.log(arreglo);
}

