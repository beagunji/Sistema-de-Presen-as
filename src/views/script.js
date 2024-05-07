// Aumentar/diminuir fonte
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
    openDyslexicStyle.appendChild(document.createTextNode(`
      @font-face {
        font-family: 'OpenDyslexicRegular';
        src: url('http://www.andrearastelli.net/font/OpenDyslexic-Regular.otf') format('opentype');
        src: url('http://www.andrearastelli.net/font/opendyslexic-regular-webfont.woff') format('woff'),
             url('http://www.andrearastelli.net/font/opendyslexic-regular-webfont.ttf') format('truetype'),
             url('http://www.andrearastelli.net/font/opendyslexic-regular-webfont.svg#opendyslexicregular') format('svg');
      }
    `));
    document.head.appendChild(openDyslexicStyle);
    const allElements = document.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].style.fontFamily = 'OpenDyslexicRegular';
    }

    currentFont = 'OpenDyslexicRegular';
  } else {
    document.head.removeChild(openDyslexicStyle);
    const allElements = document.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].style.fontFamily = 'Poppins';
    }
    currentFont = 'Poppins';
  }
}
  
// Menu dropdown
const menus = document.querySelectorAll('.menu');

menus.forEach(menu => {
  const selecionar = menu.querySelector('.selecionar');
  const seta = menu.querySelector('.seta');
  const opcoes = menu.querySelector('.opcoes');
  const opcoesAll = menu.querySelectorAll('.opcoes li');
  const selecionado = menu.querySelector('.selecionado');


  selecionar.addEventListener('click', () => {
    selecionar.classList.toggle('selecionar-clicked');
    seta.classList.toggle('seta-rotate');
    opcoes.classList.toggle('opcoes-open');
  });

  opcoesAll.forEach(opcao => {
    opcao.addEventListener('click', () => {
      selecionado.innerText = opcao.innerText;
      selecionar.classList.remove('selecionar-clicked');
      seta.classList.remove('seta-rotate');
      opcoes.classList.remove('opcoes-open');
      opcoesAll.forEach(opcao => {
        opcao.classList.remove('ativo');
      });
      opcao.classList.add('ativo');
    });
  });

});

// Buscar todos os alunos
async function buscarAlunos() {
  const response = await fetch('http://localhost:3000/api/alunos');
  const dados = await response.json();
  return dados;
}

// Mostra todos os alunos
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

      // Adiciona o codigo do aluno como um atributo
      caixaAluno.dataset.codAluno = aluno.codigo;

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
          const alunosFaltas = document.querySelectorAll('.falta.caixa-aluno');
          const faltasEnviar = [];
        
          alunosFaltas.forEach(aluno => {
            const codAluno = aluno.dataset.codAluno;
            faltasEnviar.push({ codAluno: parseInt(codAluno) }); // Convert to integer
          });
        
          try {
            const response = await fetch('http://localhost:3000/api/faltas', {
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