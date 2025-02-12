const bodyEl = document.querySelector('#body');
const botoesEl = document.querySelectorAll('.botao-escolha');

for(let botao of botoesEl){
    botao.addEventListener('click', () => {
        let classeNova = botao.getAttribute('value');
        bodyEl.classList.add('' + classeNova + '');
    });
}