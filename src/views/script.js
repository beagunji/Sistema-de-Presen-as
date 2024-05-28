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
    openDyslexicStyle.appendChild(document.createTextNode('OpenDyslexic'));
    document.head.appendChild(openDyslexicStyle);

    const allElements = document.getElementsByTagName('');
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].style.fontFamily = 'OpenDyslexic';
    }

    currentFont = 'OpenDyslexic';
  } else {
    document.head.removeChild(openDyslexicStyle);

    const allElements = document.getElementsByTagName('');
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

// Buscar todos os professores
let nomeProfessorSelecionado = '';
let codigoProfessorSelecionado = ''; // Adicionando o código do professor

async function buscarProfessores() {
  const response = await fetch('http://localhost:3000/api/professores');
  const dados = await response.json();
  return dados;
}

// Mostra todos os professores
async function exibirProfessores() {
  try {
      const resposta = await buscarProfessores();
      const professores = resposta.result;

      const listaProfessores = document.getElementById('menu-professor').querySelector('.opcoes');

      listaProfessores.innerHTML = '';

      professores.forEach(professor => {
          const opcaoProfessor = document.createElement('li');
          opcaoProfessor.textContent = professor.nomeprof;
          opcaoProfessor.classList.add('tamanhoFonte');
          opcaoProfessor.dataset.codigo = professor.codigoprof;
          listaProfessores.appendChild(opcaoProfessor);

          opcaoProfessor.addEventListener('click', () => {
            const selecionado = document.querySelector('.menu#menu-professor .selecionado');
            selecionado.textContent = professor.nomeprof;
            nomeProfessorSelecionado = professor.nomeprof;
            codigoProfessorSelecionado = professor.codigoprof; // Definir o código do professor selecionado
          });
      });
  } catch (error) {
      console.error('Erro ao buscar e exibir os professores:', error);
  }
}

// Buscar todas as disciplinas
let nomeDisciplinaSelecionada = '';
let codDisciplinaSelecionada = ''; // Adicionando o código da disciplina

async function buscarDisciplinas() {
  const response = await fetch('http://localhost:3000/api/disciplinas');
  const dados = await response.json();
  return dados;
}

// Mostrar todas as disciplinas
async function exibirDisciplinas() {
  try {
    const resposta = await buscarDisciplinas();
    const disciplinas = resposta.result;

    const listaDisciplinas = document.getElementById('menu-disciplina').querySelector('.opcoes');

    listaDisciplinas.innerHTML = '';

    disciplinas.forEach(disciplina => {
      const opcaoDisciplina = document.createElement('li');
      opcaoDisciplina.textContent = disciplina.nome;
      opcaoDisciplina.classList.add('tamanhoFonte');
      opcaoDisciplina.dataset.codigo = disciplina.codigo;
      listaDisciplinas.appendChild(opcaoDisciplina);

      opcaoDisciplina.addEventListener('click', () => {
        const selecionado = document.querySelector('.menu#menu-disciplina .selecionado');
        selecionado.textContent = disciplina.nome;
        nomeDisciplinaSelecionada = disciplina.nome;
        codDisciplinaSelecionada = disciplina.codigo; // Armazenar o código da disciplina
      });
    });
  } catch (error) {
    console.error('Erro ao buscar e exibir as disciplinas:', error);
  }
}

// Buscar todas as turmas
let nomeTurmaSelecionada = '';
let codTurmaSelecionada = ''; // Armazenar o código da turma

async function buscarTurmas() {
  const response = await fetch('http://localhost:3000/api/turmas');
  const dados = await response.json();
  return dados;
}

// Mostrar todas as turmas
async function exibirTurmas() {
  try {
      const resposta = await buscarTurmas();
      const turmas = resposta.result;

      const listaTurmas = document.getElementById('menu-turma').querySelector('.opcoes');
      listaTurmas.innerHTML = '';

      turmas.forEach(turma => {
          const opcaoTurma = document.createElement('li');
          opcaoTurma.textContent = turma.numero;
          opcaoTurma.classList.add('tamanhoFonte');
          opcaoTurma.dataset.codigo = turma.codigo;
          listaTurmas.appendChild(opcaoTurma);

          opcaoTurma.addEventListener('click', () => {
              const selecionado = document.querySelector('.menu#menu-turma .selecionado');
              selecionado.textContent = turma.numero;
              nomeTurmaSelecionada = turma.numero;
              codTurmaSelecionada = turma.codigo; // Armazenar o código da turma selecionada
          });
      });
  } catch (error) {
      console.error('Erro ao buscar e exibir turmas:', error);
  }
}

// Buscar alunos por turma
async function buscarAlunosPorTurma(cod_turma) {
  const response = await fetch(`http://localhost:3000/api/alunos/turma/${cod_turma}`);
  const dados = await response.json();
  return dados;
}

// Função para exibir alunos de uma turma selecionada
async function exibirAlunosPorTurma(cod_turma) {
  try {
    const resposta = await buscarAlunosPorTurma(cod_turma);
    const alunos = resposta.result;

    const listaAlunos = document.getElementById('lista-alunos');
    listaAlunos.innerHTML = ''; // Limpa a lista de alunos

    if (alunos.length > 0) {
      alunos.forEach(aluno => {
        const caixaAluno = document.createElement('div');
        caixaAluno.classList.add('caixa-aluno');
        caixaAluno.dataset.codAluno = aluno.codigo;

        const nomeAluno = document.createElement('div');
        nomeAluno.classList.add('nome-aluno');
        nomeAluno.textContent = aluno.nome;

        caixaAluno.appendChild(nomeAluno);
        listaAlunos.appendChild(caixaAluno);
      });
    } else {
      listaAlunos.innerHTML = '<p>Não há alunos nesta turma.</p>';
    }
  } catch (error) {
    console.error('Erro ao buscar e exibir os alunos:', error);
  }
}

// Atualizar exibição de alunos quando uma turma for selecionada
document.getElementById('menu-turma').addEventListener('click', async (event) => {
  const selectedItem = event.target.closest('li');
  if (selectedItem) {
      const cod_turma = selectedItem.dataset.codigo;
      await exibirAlunosPorTurma(cod_turma);
  }
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

    document.getElementById('menu-turma').addEventListener('click', (event) => {
      const opcaoTurma = event.target.closest('li');
      if (opcaoTurma) {
        const codTurma = opcaoTurma.dataset.codigo;
        exibirAlunosPorTurma(codTurma);
      }
    });

    if (listaAluno && enviarPresencaBtn) {
      listaAluno.addEventListener('click', (event) => {
        const divAluno = event.target.closest('.caixa-aluno');
        if (divAluno) {
          divAluno.classList.toggle('falta');
          const codigoAluno = divAluno.dataset.codAluno;
          const nomeAluno = divAluno.querySelector('.nome-aluno').innerText;

          if (divAluno.classList.contains('falta')) {
            if (!faltas[codigoAluno]) {
                faltas[codigoAluno] = { quantidade: 0, nome: nomeAluno };
            } else {
              faltas[codigoAluno].quantidade++;
            }
        } else {
            if (faltas[codigoAluno]) {
                faltas[codigoAluno].quantidade--;
                if (faltas[codigoAluno].quantidade === 0) {
                    delete faltas[codigoAluno];
                }
            }
        }
        }
    });

    enviarPresencaBtn.addEventListener('click', async () => {
      const faltasEnviar = [];
      for (let codAluno in faltas) {
        faltasEnviar.push({
          codAluno: codAluno,
          qtdeFaltas: faltas[codAluno].quantidade,
          nomeAluno: faltas[codAluno].nome,
          nomeProfessor: nomeProfessorSelecionado,
          codigoProfessor: codigoProfessorSelecionado, // Enviar o código do professor
          nomeDisciplina: nomeDisciplinaSelecionada,
          codigoDisciplina: codDisciplinaSelecionada, // Enviar o código da disciplina
          nomeTurma: nomeTurmaSelecionada,
          codigoTurma: codTurmaSelecionada // Enviar o código da turma
        });
      }

      console.log('Enviando faltas:', faltasEnviar);

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

document.addEventListener('DOMContentLoaded', () => {
  exibirProfessores();
  exibirDisciplinas();
  exibirTurmas();
});