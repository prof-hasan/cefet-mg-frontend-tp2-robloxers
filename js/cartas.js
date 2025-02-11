let cartasEl = document.querySelectorAll('.cartas');
let duplasFormadas = [];
let cartasViradas = [];
let bloqueio = false; //variável que impede o jogador de jogar enquanto tiver cartas recem viradas e erradas

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
        numAleatorio = Math.floor(Math.random() * 4) + 1; //pega um numero aleatorio para usar como class

        if (!conferirDuplas(duplasFormadas, numAleatorio)) {//se n tiver dupla com essa class adiciona a class
            cartasEl[i].classList.add('c' + numAleatorio);
            duplasFormadas.push(numAleatorio); //adciona o numero aleatorio da class para verificaçao
            //cartasEl[i].classList.remove('virada');

        } else {
            while (conferirDuplas(duplasFormadas, numAleatorio)) { // do contrario aleatoriza outro numero que nao tenha dupla
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

setTimeout(function() {
    for (let i = 0; i < cartasEl.length; i++) {
        cartasEl[i].classList.add('virada');
    }
}, 1000*2); //deixa as cartas viradas por um tempo no inicio


function clicou(e){
    if(bloqueio) {
        return; // se tiver cartas recém viradas e erradas, o jogador não joga enquanto viradas
    }

    let cartaVirada = e.currentTarget;

    if (cartaVirada.classList.contains('virada')) { //para funcionar apenas nas cartas viradas
        cartaVirada.classList.remove('virada');
        cartasViradas.push(cartaVirada);//adiciona a carta virada em um vetor para verificaçao

        if(cartasViradas.length === 2){ 
            
            if(cartasViradas[0].className === cartasViradas[1].className){ //se elas forem iguais,,,,,,, prossegue o jogo
                cartasViradas = [];
            }

            else{ //se nao, vira elas novamente
                bloqueio = true;

                setTimeout(function() {
                    cartasViradas[0].classList.add('virada');
                    cartasViradas[1].classList.add('virada');
                    cartasViradas = [];
                    bloqueio = false;
                }, 1000);
                
                
            }
            
        }
    }
}


for(let i = 0; i < cartasEl.length; i++) {
    cartasEl[i].addEventListener('click', clicou);
}