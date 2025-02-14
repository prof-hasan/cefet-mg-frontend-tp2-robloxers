const botoesEl = document.querySelectorAll('.botao-escolha');
const fundoJogoEl = document.querySelector('#fundo-jogo');
const janelaTemas = document.querySelector('#tema');
const conteinerCartasEl = document.querySelector('#container-cartas');

if (localStorage.getItem('tema') == null) {
    localStorage.setItem('tema', 'padrao');
}
// Escolhendo tema:

for (let botao of botoesEl) {
    botao.addEventListener('click', () => {
        let temaAtual = botao.getAttribute('value');
        localStorage.setItem('tema', temaAtual);
        let mostraTema = document.createElement("p");
        mostraTema.innerHTML = `Tema escolhido: ${temaAtual}`;
        janelaTemas.appendChild(mostraTema);
    });
}

// Aplicando o tema

let tema = localStorage.getItem('tema');
let fundoHtml = document.querySelector('#fundo');
conteinerCartasEl.classList.add(tema);
fundoHtml.classList.add(tema);

let mostraTema = document.createElement("p");
mostraTema.innerHTML = `Tema escolhido: ${localStorage.getItem('tema')}`;
fundoJogoEl.appendChild(mostraTema);
