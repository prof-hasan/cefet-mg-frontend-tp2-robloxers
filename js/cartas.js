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
let jogador = localStorage.getItem('jogador');
let $janelaPerdeu = $('#perdeu');
let $sair = $('#sair');
let $jogarNovamente = $('#jogar-novamente');
let intervalo; //tempo das cartas viradas
let $voltarInicio = $('#voltar-inicio');

//let 
jogador = JSON.parse(jogador);

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

    if (fase >= 8 && fase < 16) {
        dificuldade = 'médio';
    }
    else if (fase >= 16) {
        dificuldade = 'difícil';
    }
    else {
        dificuldade = 'fácil';
    }
    
    if (dificuldade === 'fácil') {
        tempo = 30;
        subtrairPontuacao = 5;
        intervalo = 1000;
    } 
    if (dificuldade === 'médio') {
        tempo = 20;
        subtrairPontuacao = 10;
        intervalo = 600;
    } 
    if (dificuldade === 'difícil') {
        tempo = 15;
        subtrairPontuacao = 20;
        intervalo = 300;
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
    }, intervalo * 2); //deixa as cartas viradas por um tempo no inicio
}

setInterval(function() {
    if(prenderRelogio) return;
    tempo -= 1;
    $relogio.html(tempo);

    if(tempo === 0) {
        //tempo = 40;

        if(jogador.recorde < pontuacao) {
                jogador.recorde = pontuacao;

                localStorage.setItem('jogador', JSON.stringify(jogador));
            }
        
        prenderRelogio = true;
        bloqueio = true;
        $janelaPerdeu.css('display', 'block');
        $('#perdeu p').html(`Pontuação: ${pontuacao}`);

        $jogarNovamente.click(function() {
            prenderRelogio = false;
            bloqueio = false;
            $placar.html('0');
            fase = 1;
            pontuacao = 0;
            $janelaPerdeu.css('display', 'none');
            iniciarNovoJogo();
        });
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
                    if (dificuldade == 'fácil') {
                        pontuacao += 5;
                    }
                    if (dificuldade == 'médio') {
                        pontuacao += 10;
                    }
                    if (dificuldade == 'difícil') {
                        pontuacao += 15;
                    }

                    $placar.html(pontuacao);
                    
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
                }, intervalo);
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

$voltarInicio.click(function() {
    if(jogador.recorde < pontuacao) {
        jogador.recorde = pontuacao;

        localStorage.setItem('jogador', JSON.stringify(jogador));
    }
});