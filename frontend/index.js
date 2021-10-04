const urlApi = 'http://localhost:3000/filmes'
let editando = false;
let idEdit = 0;



const itemLista = document.querySelector('ul');
console.log(itemLista);

const getFilmes = async () => {
  
  const response = await fetch(urlApi);
  const data = await response.json();
  //console.log(`get all filmes: ${JSON.stringify(data)}`);
  const teste = `${data[0].visto?'marcado':''}`;
  console.log(teste);
  data.map((filme) => {

    itemLista.insertAdjacentHTML('beforeend', `
    <div class="movie-card" id=${filme.id}>
      <img src="${filme.imagem}">
        <h3>${filme.nome}</h3>
          <div class="notaCheck">
            <p>Nota:</p>
              <p class="nota"> ${filme.nota}</p>
                <label>Já vi!
                  <input type="checkbox" name="visto" onClick="filmeMarcado(${filme.id})"/>
                  </label>
                </div>
                <div class="btns-genre">
                <div class="genero">${filme.genero}</div>
                <div class="del-edit">

                <button class="btn btn-outline-danger row " onClick="deleteFilme(${filme.id})">Deletar</button>

                <button type="button" class="btn btn-secondary" onClick="updateFilme(${filme.id})">Editar</button>
                
                </div>
                </div>
                
              </div>
    `)

    if(filme.visto){
      const card = document.getElementById(filme.id);
      card.classList.add('marcado');
      card.querySelector('input[type=checkbox]').checked = true;
    }

    console.log(filme)
  });
}

getFilmes();



const submitForm = async (evento) => {
  evento.preventDefault();

  let inputNome = document.querySelector('#nome').value;
  let inputGenero = document.querySelector('#genero').value;
  let inputNota = document.querySelector('#nota').value;
  let inputImagem = document.querySelector('#imagem').value;



  console.log(evento)



  const filmeCard = {
    nome: inputNome,
    genero: inputGenero,
    nota: inputNota,
    imagem: inputImagem,

  }


  if (!editando) {
    const request = new Request(`${urlApi}/add`, {
      method: 'POST',
      body: JSON.stringify(filmeCard),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

    const response = await fetch(request);
    const result = await response.json();

    if (result) {
      getFilmes();
    }

  } else {

    const request = new Request(`${urlApi}/${idEdit}`, {
      method: 'PUT',
      body: JSON.stringify(filmeCard),
      headers: new Headers({
        'Content-Type': 'application/json'
      })


    })


    const response = await fetch(request);

    const result = await response.json();

    if (result) {
      getFilmes();

    }
  }

  nome.value = '';
  genero.value = '';
  nota.value = '';
  imagem.value = '';

  itemLista.innerHTML = '';



  editando = false;
}

const getFilmeById = async (id) => {
  const response = await fetch(`${urlApi}/${id}`);
  return filme = await response.json();

}





const updateFilme = async (id) => {
  editando = true;
  idEdit = id;

  const filme = await getFilmeById(id);

  let titleElement = document.getElementById('nome');
  let genreElement = document.getElementById('genero');
  let imageElement = document.getElementById('imagem');
  let gradeElement = document.getElementById('nota');

  titleElement.value = filme.nome;
  genreElement.value = filme.genero;
  imageElement.value = filme.imagem;
  gradeElement.value = filme.nota;



}


const deleteFilme = async (id) => {
  const request = new Request(`${urlApi}/${id}`, { method: 'DELETE', })
  const response = await fetch(request);
  const data = await response.json();
  console.log(data.message);

  itemLista.innerHTML = '';
  getFilmes();
}


const filmeMarcado = async (id)=> {
  
  
  console.log('marcou', id)
  const card = document.getElementById(id);
  
  const checkbox = card.querySelector('input[type=checkbox]');
  
  
  const request = new Request(`${urlApi}/${id}/visto`, 
    {method: 'PUT', 
    body: JSON.stringify({visto:checkbox.checked})});

  await fetch(request)
  console.log(request)

  if(checkbox.checked){
    card.classList.add('marcado');
  } else{
    card.classList.remove('marcado');
  }
  // getFilmes();

}

