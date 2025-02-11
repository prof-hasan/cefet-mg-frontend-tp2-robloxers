//index variáveis
const botaoCreditosEl = document.querySelector('#botao-creditos');
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