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
  window.location.href = "E:/escola/index.html";
    }
document.getElementById('botãoConfirmar').addEventListener('click', voltarPagina);

/*
function buscarDados() {
    let data = document.getElementById("data").value;
    let turma = document.getElementById("turma").value;

    if (data === "" || turma === "9") {
        alert("Por favor, selecione uma data e turma.");
        return;
    }

    let tbody = document.getElementById("relatorio").getElementsByTagName("tbody")[0];
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Chamar a API e buscar os dados
    // Exibir os dados na tabela
}


/////////////////////////////////////////////


//Fetch enviar dados para servidor
const fetchReportData = async (turma) => {
    const response = await fetch(`//faltas?turma=${turma}`);
    const data = await response.json();
    return data;
};

// Tabela
const popularRelatorio = (data) => {
    const tbody = document.querySelector('#relatorio tbody');
tbody.innerHTML = '';
    data.forEach((row) => {
        const tabela = document.createElement('tabela');
        tabela.innerHTML = `
            <td>${row.data}</td>
            <td>${row.cod_aluno}</td>
            <td>${row.nome_aluno}</td>
            <td>${row.turma}</td>
            <td>${row.disciplina}</td>
            <td>${row.qtde_faltas}</td>
            <td>${row['% de Faltas']}</td>
            <td>${row.deletar}</td>
        `;
        tbody.appendChild(tabela);
    });
};

//Turma
document.querySelector('#turma').addEventListener('change', async () => {
    const turma = document.querySelector('#turma').value;
    const data = await fetchReportData(turma);
    popularRelatorio(data);
});

document.addEventListener('DOMContentLoaded', async () => {
  const turma = document.querySelector('#turma').value; // Assuming you have a turma dropdown
  const data = await fetchReportData(turma);
  popularRelatorio(data);
});*/

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

function deletarFalta(codigoAluno) {
  // Implemente a lógica para deletar a falta com o código do aluno
}

document.addEventListener('DOMContentLoaded', exibirFaltas);



