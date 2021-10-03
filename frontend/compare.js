const submitForm = async (evento) => {
    // previne a pagina de atualizar devido ao evento de submit do botao ter sido executado
    evento.preventDefault();
  
    // precisamos pegar os valores que o usuario preenche no formulario
    // buscar o input e buscar o seu value.
    let titulo = document.getElementById('titulo');
    let descricao = document.getElementById('descricao');
    let salario = document.getElementById('salario');
    let senioridade = document.getElementById('senioridade');
  
    // adicionamos os valores dos inputs em campos do nosso objeto vaga
    const vaga = {
      titulo: titulo.value,
      descricao: descricao.value,
      salario: salario.value,
      senioridade: senioridade.value
    }
  
    // verificamos se esta ou nao no modo de edicao, se nao estiver dispara o POST
    // se estiver dispara o PUT
    if(!edicao) { 
      // estamos configurando a nossa requisicao antes dela ser disparada
      const request = new Request(`${urlApi}/add`, {
        method: 'POST',
        body: JSON.stringify(vaga),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      
      // chamamos a funcao fetch de forma assincrona de acordo com as nossas configuracoes anteriores
      const response = await fetch(request);
      // pegamos o resultado do fetch assincrono e acessamos o body no formato json
      const result = await response.json();
  
      if(result) {
        getVagas();
      }
  
    } else {
      // Configuramos o request do PUT
      // Nesse caso precisamos enviar o id na requisicao, repare que estamos pegando uma variavel
      // chamada idEdicao, essa variavel é atualizada com o id da vaga quando é clicado o botao editar
      const request = new Request(`${urlApi}/${idEdicao}`, {
        method: 'PUT',
        body: JSON.stringify(vaga),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
  
      // chamamos a funcao fetch de forma assincrona de acordo com as nossas configuracoes anteriores
      const response = await fetch(request);
      // pegamos o resultado do fetch assincrono e acessamos o body no formato json
      const result = await response.json();
  
      // verifica se houve retorno da api, caso sim, manda renderizar as vagas novamente.
      if(result) {
        getVagas();
      }
    }
  
  
    //limpamos os camos atualizando os seus values no input com o valor string vazia.
    titulo.value = '';
    descricao.value = '';
    salario.value = '';
    senioridade.value = '';
  
    // limpa a lista do html para poder ser populada novamente com os valores do getVagas();
    lista.innerHTML = '';
  }