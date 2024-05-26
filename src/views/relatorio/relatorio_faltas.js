//https://opendyslexic.org/
//instalar esta fonte no notebook

//aumentar, diminuir fonte
function mudarTamanhoFonte(type) {
  const tamanho = type === 'aumentar' ? 2 : -2;
  const elementos = document.querySelectorAll('.tamanhoFonte');

  elementos.forEach(elemento => {
    const tamanhoAtual = parseFloat(window.getComputedStyle(elemento, null).getPropertyValue('font-size'));
    elemento.style.fontSize = `${tamanhoAtual + tamanho}px`;
  });
}

// Alterar fonte
 let currentFont = 'Poppins';
    let openDyslexicStyle = null;

    function mudarFonte() {
      if (currentFont === 'Poppins') {
        openDyslexicStyle = document.createElement('style');
        openDyslexicStyle.appendChild(document.createTextNode('OpenDyslexic'));
        document.head.appendChild(openDyslexicStyle);

        const allElements = document.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
          allElements[i].style.fontFamily = 'OpenDyslexic';
        }

        currentFont = 'OpenDyslexic';
      } else {
        document.head.removeChild(openDyslexicStyle);

        const allElements = document.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
          allElements[i].style.fontFamily = 'Poppins';
        }

        currentFont = 'Poppins';
      }
    }

// BOTÃO VOLTAR
function voltarPagina() {
  window.location.href = "";
    }
document.getElementById('botãoConfirmar').addEventListener('click', voltarPagina);

//Botão imprimir
document.querySelector('#imprimir_button').addEventListener('click', () => {
    window.print();
});


// Buscar dados
document.querySelector('#turma').dispatchEvent(new Event('change'));

// Efeito
function jumpButton() {
  var button = document.getElementById("botãoConfirmar");
  button.classList.add("active");
  setTimeout(function() {
    button.classList.remove("active");
  }, 300);
}

function jumpButtonI() {
  var button = document.getElementById("imprimir_button");
  button.classList.add("active");
  setTimeout(function() {
    button.classList.remove("active");
  }, 300);
}

function jumpButtonL() {
  var button = document.getElementById("botaoMudarLetra");
  button.classList.add("active");
  setTimeout(function() {
    button.classList.remove("active");
  }, 300);
}
// Fim do efeito


async function buscarFaltas() {
  try {
    const response = await fetch('http://localhost:3000/api/faltas');
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Erro ao buscar faltas:', error);
  }
}

async function exibirFaltas() {
  const faltas = await buscarFaltas();

  const tbody = document.querySelector('#relatorio tbody');
  tbody.innerHTML = '';

  faltas.forEach(falta => {
    const dataFormatada = new Date(falta.data).toLocaleDateString();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${dataFormatada}</td>
      <td>${falta.codigoAluno}</td>
      <td>${falta.qtdeFaltas}</td>
      <td>${falta.porcFaltas}</td>
      <td><button onclick="deletarFalta(${falta.codigoAluno})">Deletar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function deletarFalta(codigoAluno, data) {
  try {
    const response = await fetch('http://localhost:3000/api/faltas', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ codAluno: codigoAluno, data: data })
    });

    if (response.ok) {
      alert('Falta deletada com sucesso!');
      exibirFaltas(); // Atualiza a tabela de faltas após a exclusão
    } else {
      alert('Erro ao deletar a falta.');
    }
  } catch (error) {
    console.error('Erro ao deletar falta:', error);
  }
}

function gerarNotificacao() {
  const tabelaLinhas = document.querySelectorAll('#relatorio tbody tr');
  const alertaLimite = 25; // 25% faltas
  const emailData = [];

  tabelaLinhas.forEach((row) => {
    const porcentagemCelula = row.cells[5];
    const porcentagemValor = parseFloat(porcentagemCelula.textContent.replace('%', ''));

    if (porcentagemValor >= alertaLimite) {
      const alunoNome = row.cells[1].textContent;
      const professorNome = row.cells[2].textContent;
      const disciplina = row.cells[3].textContent;
      const ausenciaTotal = row.cells[4].textContent;

      const arquivoConteudo = `Alerta de Faltas Excessivas:
        Aluno: ${alunoNome}
        Professor: ${professorNome}
        Disciplina: ${disciplina}
        Qtde de Faltas: ${ausenciaTotal}
        % de Faltas: ${Porc_Faltas}%`;

      // Gera o arquivo.txt e manda por email
      const blob = new Blob([arquivoConteudo], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

      emailData.push({
        alunoNome,
        professorNome,
        disciplina,
        ausenciaTotal,
        Porc_Faltas,
      });
    }
  });

  // Envia e-mails
  //emailjs.send(codigoAluno, emailData);
}

document.addEventListener('DOMContentLoaded', gerarNotificacao);


///////////////////

async function exibirDatas() {
  const datas = await buscarDatas();

  const tbody = document.querySelector('#relatorio tbody');
  tbody.innerHTML = '';

  datas.forEach(falta => {
    const dataBusca = new Date(falta.Datas).toLocaleDateString();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${dataBusca}</td>
      <td>${falta.codigoAluno}</td>
      <td>${falta.qtdeFaltas}</td>
      <td>${falta.porcFaltas}</td>
      <td><button onclick="deletarFalta(${falta.codigoAluno})">Deletar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', exibirFaltas);



