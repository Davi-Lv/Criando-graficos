const valorAzulInput = document.getElementById('valor-azul');
const valorVermelhoInput = document.getElementById('valor-vermelho');

const gerarGraficoBtn = document.getElementById('gerar-grafico');
const graficoCanvas = document.getElementById('grafico');

const adicionarInputBtn = document.getElementById('adicionar-input');
const inputsAdicionaisDiv = document.getElementById('inputs-adicionais');
let grafico;

gerarGraficoBtn.addEventListener('click', () => {
  if (grafico) {
    grafico.destroy();
  }

  const valores = [];
  const cores = [];
  const nomes = [];

  valores.push(parseInt(valorAzulInput.value));
  cores.push('#007bff');
  nomes.push('Azul');

  valores.push(parseInt(valorVermelhoInput.value));
  cores.push('#dc3545');
  nomes.push('Vermelho');

  const inputsAdicionais = document.querySelectorAll('.input-adicional');
  inputsAdicionais.forEach((input) => {
    const nome = input.querySelector('.nome').value;
    nomes.push(nome);
    valores.push(parseInt(input.querySelector('.valor').value));
    cores.push(gerarCorAleatoria());
  });

  const data = {
    labels: nomes,
    datasets: [
      {
        data: valores,
        backgroundColor: cores,
      },
    ],
  };

  const options = {};

  grafico = new Chart(graficoCanvas, {
    type: 'pie',
    data: data,
    options: options,
  });
});

adicionarInputBtn.addEventListener('click', () => {
  const novoInputDiv = document.createElement('div');
  novoInputDiv.classList.add('input-adicional');

  const nomeInput = document.createTextNode('Nome');
  novoInputDiv.appendChild(nomeInput);

  const novoNomeInput = document.createElement('input');
  novoNomeInput.type = 'text';
  novoNomeInput.classList.add('nome');
  novoNomeInput.placeholder = 'Nome do valor';
  novoInputDiv.appendChild(novoNomeInput);

  const valorInput = document.createTextNode('Valor');
  novoInputDiv.appendChild(valorInput);

  const novoValorInput = document.createElement('input');
  novoValorInput.type = 'number';
  novoValorInput.placeholder = 'valor';
  novoValorInput.classList.add('valor');
  novoInputDiv.appendChild(novoValorInput);

  const removerInputBtn = document.createElement('button');
  removerInputBtn.classList.add('remove-Input')
  removerInputBtn.textContent = 'Remover Input';
  removerInputBtn.addEventListener('click', () => {
    novoInputDiv.remove();
  });
  novoInputDiv.appendChild(removerInputBtn);

  inputsAdicionaisDiv.appendChild(novoInputDiv);
});

function gerarCorAleatoria() {
  const hexadecimais = '0123456789ABCDEF';
  let cor = '#';
  for (let i = 0; i < 6; i++) {
    cor += hexadecimais[Math.floor(Math.random() * 16)];
  }
  return cor;
}
