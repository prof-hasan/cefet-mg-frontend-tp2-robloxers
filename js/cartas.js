let cartasEl = document.querySelectorAll('.cartas');
let duplasFormadas = [];
let cartasViradas = [];
let bloqueio = false; //variável que impede o jogador de jogar enquanto tiver cartas recem viradas e erradas
let pontuacao = 0;
let $placar = $('.pontuacao');
let tempo;
let $relogio = $('.tempo');
let prenderRelogio = true;
let dificuldade = 'facil';
let fase = 1;
let $fase = $('.fase');
let subtrairPontuacao;
let intervalo;

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

function virarCartas(cartas) {
    for (let carta of cartas) {
        carta.classList.add('virada');
    }
}

function confeirFimDePartida() { //conefere se a partida terminou
    for (let carta of cartasEl) { 
        if(carta.classList.contains('virada')) {
            return false; //se ainda tiver uma carta virada, não terminou
        }
    }
    //tempo = 40;
    return true; //se todas as cartas foram viradas, acabou
}

function iniciarNovoJogo() {
    for (let carta of cartasEl) {
        carta.classList.remove('c1');
        carta.classList.remove('c2');
        carta.classList.remove('c3');
        carta.classList.remove('c4');
    }
    duplasFormadas = [];
    criarDuplas();

    if (fase >= 5 && fase < 10) {
        dificuldade = 'médio';
    }
    else if (fase >= 10) {
        dificuldade = 'difícil';
    }
    else {
        dificuldade = 'fácil';
    }
    
    if (dificuldade === 'fácil') {
        tempo = 45;
        subtrairPontuacao = 5;
    } 
    if (dificuldade === 'médio') {
        tempo = 30;
        subtrairPontuacao = 10;
    } 
    if (dificuldade === 'difícil') {
        tempo = 15;
        subtrairPontuacao = 20;
    } 
    
    $relogio.html(tempo);

    $fase.html(fase);

    for (let carta of cartasEl) {
        carta.classList.remove('virada');
    }

    prenderRelogio = true;
    setTimeout(() =>{
        virarCartas(cartasEl);
        prenderRelogio = false;
    }, 1000*2); //deixa as cartas viradas por um tempo no inicio
}

setInterval(function() {
    if(prenderRelogio) return;
    tempo -= 1;
    $relogio.html(tempo);
    if(tempo === 0) {
        //tempo = 40;
        $placar.html('0');
        fase = 1;
        pontuacao = 0;
        iniciarNovoJogo();
    }
}, 1000);

iniciarNovoJogo();

function virou(e){
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

                pontuacao += 10;
                $placar.html(pontuacao);

                if(confeirFimDePartida()) {
                    fase +=1;
                    setTimeout(iniciarNovoJogo, 1000);
                    //iniciarNovoJogo();
                }
            }

            else{ //se nao, vira elas novamente
                bloqueio = true;

                setTimeout(() => {
                    virarCartas(cartasViradas);
                    bloqueio = false;
                    cartasViradas = [];
                }, 1000);
                pontuacao -= subtrairPontuacao;

                if(pontuacao < 0) pontuacao = 0;

                $placar.html(pontuacao);

            }
            
        }
    }
}


for(let i = 0; i < cartasEl.length; i++) {
    cartasEl[i].addEventListener('click', virou);
}