const form = document.querySelector('form');

const btn = () => {
    let cpf = document.querySelector('#cpf').value;
    let telefone = document.querySelector('#telefone').value;
    let cep = document.querySelector('#cep').value;
    let resultado = `CPF: ${cpf} | Telefone: ${telefone} | CEP: ${cep}`;

    document.querySelector('#resultado').innerHTML = resultado;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    btn();
});