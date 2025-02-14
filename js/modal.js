//Janela temas
const botaoTemas = document.querySelector('#botao-tema');
const barraTemasEl = document.querySelector('#tema');
const botaoVoltarEl = document.querySelector('.voltar');
const botaoCredito = document.querySelector('#botao-creditos')
const barraCreditoEl = document.querySelector('#credito')

function revelar(){
    barraTemasEl.classList.remove('invisivel');
    barraTemasEl.classList.add('visivel');
}

function esconder(){
    barraTemasEl.classList.remove('visivel');
    barraTemasEl.classList.add('invisivel');
}

botaoTemas.addEventListener('click', revelar);
botaoVoltarEl.addEventListener('click', esconder);

botaoCredito.addEventListener('click', () => {
    barraCreditoEl.classList.toggle('visivel');
    barraCreditoEl.classList.toggle('');
})

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