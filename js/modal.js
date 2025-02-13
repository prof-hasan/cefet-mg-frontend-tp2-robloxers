//Janela temas
const botaoCreditosEl = document.querySelector('#botao-tema');
const barraCreditosEl = document.querySelector('#tema');
const botaoVoltarEl = document.querySelector('.voltar');

function revelar(){
    barraCreditosEl.classList.remove('invisivel');
    barraCreditosEl.classList.add('visivel');
}

function esconder(){
    barraCreditosEl.classList.remove('visivel');
    barraCreditosEl.classList.add('invisivel');
}

botaoCreditosEl.addEventListener('click', revelar);
botaoVoltarEl.addEventListener('click', esconder);

//Registrar no local storage
if(JSON.parse(localStorage.getItem('jogador')) == null) {
    let jogadorAUX = {
        nome: '',
        recorde: 0
    };

    localStorage.setItem('jogador', JSON.stringify(jogadorAUX));
}

let jogador = JSON.parse(localStorage.getItem('jogador'));

let inputNome = document.querySelector('#nome');
let $recorde = $('#recorde');
let $botaoRegistrar = $('#registrar');

$botaoRegistrar.css('display', 'none');

inputNome.value = jogador.nome;

$recorde.html(jogador.recorde);

$botaoRegistrar.click(function() {
    jogador.nome = inputNome.value;
    console.log();
    localStorage.setItem('jogador', JSON.stringify(jogador));
    $botaoRegistrar.css('display', 'none');
});

inputNome.addEventListener('input', function() {
    $botaoRegistrar.css('display', 'inline');
});