const bodyEl = document.querySelector('#body');
const botoesEl = document.querySelectorAll('.botao-escolha');

for(let botao in botoesEl){
    botao.addEventListener('click', () => {
        let classeNova = botao.getAttribute('value');
        bodyEl.style.backgroundImage = '';
        bodyEl.classList.toggle(classeNova);
    });
}