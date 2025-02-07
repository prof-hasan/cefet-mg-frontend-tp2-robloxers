let cartasEl = document.querySelectorAll('.cartas');
let duplasFormadas = [],
    cartasViradas = [];

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

for (let cartaEl of cartasEl) {
    cartaEl.classList.add('virada');
}

function clicou(e){
    let cartaVirada = e.currentTarget;

    if (cartaVirada.classList.contains('virada')) {
        cartaVirada.classList.remove('virada');
        cartasViradas.push(cartaVirada);

        if(cartasViradas.length === 2){
            
            if(cartasViradas[0].className === cartasViradas[1].className){
                cartasViradas = [];
            }

            else{
                cartasViradas[0].classList.add('virada');
                cartasViradas[1].classList.add('virada');
                cartasViradas = [];
            }
        }
    }
}

for(let i = 0; i < cartasEl.length; i++){
    cartasEl[i].addEventListener('click', clicou);
}