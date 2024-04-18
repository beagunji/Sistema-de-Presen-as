//aumentar fonte
function mudarTamanhoFonte(type){
    let txts = [".botaoVoltar",".h1", ".h2", ".h3", ".h4", "#span1", "#span2", "#span3", "#span4", "#span5",
      "#span6", "#span7", "#span8", "#span9", "#span10", "#span11", "#span12", "#span13",
      "#span14", "#span15", "#span16", "#span17", "#span18", "#span19",
      "#blocoNomesTamanhoFonte", "#botao-salvar", "#botao-confirmar"];
  
    txts.forEach(txt => {
  
      let letra = document.querySelector(txt);
  
      if (letra) {
        let tamanhoFonte = window.getComputedStyle(letra, null).getPropertyValue("font-size");
  
        tamanhoFonte = parseFloat(tamanhoFonte);
  
        if(type === "aumentar"){
          letra.style.fontSize = (tamanhoFonte + 5) + "px";
        }else{
          letra.style.fontSize = (tamanhoFonte - 5) + "px";
        }
      }
    })
}
  
// Barras Dropdown
const selectedAll = document.querySelectorAll(".wrapper-dropdown");

selectedAll.forEach((selected) => {
  const optionsContainer = selected.children[2];
  const optionsList = selected.querySelectorAll("div.wrapper-dropdown li");

  selected.addEventListener("click", () => {
    let arrow = selected.children[1];

    if (selected.classList.contains("active")) {
      handleDropdown(selected, arrow, false);
    } else {
      let currentActive = document.querySelector(".wrapper-dropdown.active");

      if (currentActive) {
        let anotherArrow = currentActive.children[1];
        handleDropdown(currentActive, anotherArrow, false);
      }

      handleDropdown(selected, arrow, true);
    }
  });

  for (let o of optionsList) {
    o.addEventListener("click", () => {
      selected.querySelector(".selected-display").innerHTML = o.innerHTML;
    });
  }
});

window.addEventListener("click", function (e) {
  if (e.target.closest(".wrapper-dropdown") === null) {
    closeAllDropdowns();
  }
});

function closeAllDropdowns() {
  const selectedAll = document.querySelectorAll(".wrapper-dropdown");
  selectedAll.forEach((selected) => {
    const optionsContainer = selected.children[2];
    let arrow = selected.children[1];

    handleDropdown(selected, arrow, false);
  });
}

function handleDropdown(dropdown, arrow, open) {
  if (open) {
    arrow.classList.add("rotated");
    dropdown.classList.add("active");
  } else {
    arrow.classList.remove("rotated");
    dropdown.classList.remove("active");
  }
}

/*------------------------------------------------------------------------------------------*/ 

//Buscar todos os alunos
async function buscarAlunos() {
  const response = await fetch('http://localhost:3000/api/alunos');
  const dados = await response.json();
  return dados;
}

//Mostra todos os alunos
async function exibirAlunos() {
  try {
    const resposta = await buscarAlunos(); 
    const alunos = resposta.result;

    console.log('Alunos recebidos:', alunos);

    const listaAlunos = document.getElementById('lista-alunos');

    listaAlunos.innerHTML = '';

    alunos.forEach(aluno => {
      const caixaAluno = document.createElement('div');
      caixaAluno.classList.add('caixa-aluno');

      caixaAluno.dataset.codAluno = aluno.Cod_Aluno;

      const nomeAluno = document.createElement('div');
      nomeAluno.classList.add('nome-aluno');
      nomeAluno.textContent = aluno.nome; 

      caixaAluno.appendChild(nomeAluno);

      listaAlunos.appendChild(caixaAluno);
    });
  } catch (error) {
    console.error('Erro ao buscar e exibir os alunos:', error);
  }
}

/*------------------------------------------------------------------------------------------*/ 

document.addEventListener('DOMContentLoaded', () => {
    const listaAluno = document.getElementById('lista-alunos');
    const enviarPresencaBtn = document.getElementById('botao-confirmar');
    const faltas = {}; // Objeto para armazenar as faltas

    if (listaAluno && enviarPresencaBtn) {
        listaAluno.addEventListener('click', (event) => {
            const divAluno = event.target.closest('.caixa-aluno');
            if (divAluno) {
                divAluno.classList.toggle('falta');

                // Armazenar a falta se a div estiver com a classe falta
                const codigoAluno = divAluno.dataset.codAluno;
                console.log('Codigo do aluno:', codigoAluno)
                if (divAluno.classList.contains('falta')) {
                    if (!faltas[codigoAluno]) {
                        faltas[codigoAluno] = [];
                    }
                    const dataAtual = new Date().toISOString().split('T')[0];
                    faltas[codigoAluno].push(dataAtual);
                } else {
                    // Remover a falta se a div não estiver com a classe falta
                    const index = faltas[codigoAluno].indexOf(dataAtual);
                    if (index !== -1) {
                        faltas[codigoAluno].splice(index, 1);
                    }
                }
            }
        });

        enviarPresencaBtn.addEventListener('click', async () => {
            const alunosFaltas = document.querySelectorAll('.falta .caixa-aluno');
            const faltasEnviar = [];

            alunosFaltas.forEach(aluno => {
                const codAluno = aluno.dataset.codAluno;
                faltasEnviar.push({ codAluno });
            });

            try {
                const response = await fetch('/api/faltas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ faltasEnviar })
                });

                if (response.ok) {
                    console.log('Faltas confirmadas com sucesso!');
                } else {
                    console.error('Erro ao confirmar faltas:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao confirmar faltas:', error);
            }
        });
    }
});

window.onload = exibirAlunos;