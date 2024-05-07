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
  
  
  //alterar fonte
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
  
  
  //Fetch enviar dados para servidor
  const fetchReportData = async (turma) => {
      const response = await fetch(`/api/relatorio?turma=${turma}`);
      const data = await response.json();
      return data;
  };
  
  //Tabela
  const popularRelatorio = (data) => {
      const tbody = document.querySelector('#relatorio tbody');
  tbody.innerHTML = '';
      data.forEach((row) => {
          const tabela = document.createElement('tabela');
          tabela.innerHTML = `
              <td>${row.data}</td>
              <td>${row.nome_aluno}</td>
              <td>${row.nome_professor}</td>
              <td>${row.disciplina}</td>
              <td>${row.qtde_faltas}</td>
              <td>${row['% de Faltas']}</td>
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
  
  //Botão imprimir
  document.querySelector('#imprimir_button').addEventListener('click', () => {
      window.print();
  });
  
  
  //Buscar dados
  document.querySelector('#turma').dispatchEvent(new Event('change'));
  
  //efeito
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
  
  //CALENDÁRIO
  
  
  