// Selecionando elementos do DOM
const valorAzulInput = document.getElementById('valor-azul');
const valorVermelhoInput = document.getElementById('valor-vermelho');

const gerarGraficoBtn = document.getElementById('gerar-grafico');
const graficoCanvas = document.getElementById('grafico');

const adicionarInputBtn = document.getElementById('adicionar-input');
const inputsAdicionaisDiv = document.getElementById('inputs-adicionais');

// Variáveis globais
let grafico;

// Adicionando evento de clique ao botão de gerar gráfico
gerarGraficoBtn.addEventListener('click', () => {
  // Destruindo o gráfico anterior, se existir
  if (grafico) {
    grafico.destroy();
  }

  // Definindo arrays de valores, cores e nomes para o gráfico
  const valores = [];
  const cores = [];
  const nomes = [];

  // Adicionando os valores, cores e nomes dos inputs principais
  valores.push(parseInt(valorAzulInput.value));
  cores.push('#007bff');
  nomes.push('Azul');

  valores.push(parseInt(valorVermelhoInput.value));
  cores.push('#dc3545');
  nomes.push('Vermelho');

  // Adicionando os valores, cores e nomes dos inputs adicionais
  const inputsAdicionais = document.querySelectorAll('.input-adicional');
  inputsAdicionais.forEach((input) => {
    const nome = input.querySelector('.nome').value;
    nomes.push(nome);
    valores.push(parseInt(input.querySelector('.valor').value));
    cores.push(gerarCorAleatoria());
  });

  // Criando objeto de dados para o gráfico
  const data = {
    labels: nomes,
    datasets: [
      {
        data: valores,
        backgroundColor: cores,
      },
    ],
  };

  // Definindo opções para o gráfico
  const options = {};

  // Criando novo gráfico
  grafico = new Chart(graficoCanvas, {
    type: 'pie',
    data: data,
    options: options,
  });
});

// Adicionando evento de clique ao botão de adicionar input
adicionarInputBtn.addEventListener('click', () => {
  const novoInputDiv = document.createElement('div');
  novoInputDiv.classList.add('input-adicional');

  // Criando novo elemento de input adicional
  const nomeInput = document.createTextNode('Nome');
  novoInputDiv.appendChild(nomeInput);

  // Adicionando campo de nome do input adicional
  const novoNomeInput = document.createElement('input');
  novoNomeInput.type = 'text';
  novoNomeInput.classList.add('nome');
  novoNomeInput.placeholder = 'Nome do valor';
  novoInputDiv.appendChild(novoNomeInput);

  // Adicionando campo de valor do input adicional
  const valorInput = document.createTextNode('Valor');
  novoInputDiv.appendChild(valorInput);

  const novoValorInput = document.createElement('input');
  novoValorInput.type = 'number';
  novoValorInput.placeholder = 'valor';
  novoValorInput.classList.add('valor');
  novoInputDiv.appendChild(novoValorInput);

  // Adicionando botão de remover input adicional
  const removerInputBtn = document.createElement('button');
  removerInputBtn.classList.add('remove-Input')
  removerInputBtn.textContent = 'Remover Input';
  removerInputBtn.addEventListener('click', () => {
    novoInputDiv.remove();
  });
  novoInputDiv.appendChild(removerInputBtn);

  inputsAdicionaisDiv.appendChild(novoInputDiv);
});

// Gera uma cor aleatória em formato hexadecimal
function gerarCorAleatoria() {
  const hexadecimais = '0123456789ABCDEF';
  let cor = '#';
  for (let i = 0; i < 6; i++) {
    cor += hexadecimais[Math.floor(Math.random() * 16)];
  }
  return cor;
}
