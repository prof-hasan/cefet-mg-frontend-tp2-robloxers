let cartasEl = document.querySelectorAll('.cartas');
let duplasFormadas = [];

function conferirDuplas(v, num){ //ele confere se ja tem uma dupla com esse numero
    let cont = 0;
    for(let i = 0; i < v.length; i++) { 
        if(v[i] === num) cont++;
        if(cont === 2) return true;
    }
    return false;
}

function criarDuplas(){
    let numAleatorio;

    for (let i = 0; i < cartasEl.length; i++) {
        numAleatorio = Math.floor(Math.random() * 4) + 1;

        if (!conferirDuplas(duplasFormadas, numAleatorio)) {
            cartasEl[i].classList.add('c' + numAleatorio);
            duplasFormadas.push(numAleatorio);
            //cartasEl[i].classList.remove('virada');

        } else {
            while (conferirDuplas(duplasFormadas, numAleatorio)) {
                numAleatorio = Math.floor(Math.random() * 4) + 1;

                if (!conferirDuplas(duplasFormadas, numAleatorio)) {
                    cartasEl[i].classList.add('c' + numAleatorio);
                    //cartasEl[i].classList.remove('virada');
                    break;
                }
            }
            duplasFormadas.push(numAleatorio);
        }
        
    }
}

criarDuplas();