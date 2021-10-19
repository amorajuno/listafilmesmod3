const urlApi = 'http://localhost:3000/filmes'
let editando = false;
let idEdit = 0;



const itemLista = document.querySelector('ul');
console.log(itemLista + 'lista selecionada');

const getFilmes = async () => {
  
  const response = await fetch(urlApi);
  const data = await response.json();
  // console.log(response);
  //console.log(`get all filmes: ${JSON.stringify(data)}`);
  // const teste = `${data[0].visto?'marcado':''}`
  // console.log(teste);
  data.map((filme) => {

    itemLista.insertAdjacentHTML('beforeend', `
    <div class="movie-card" id='${filme._id}'>
      <img src="${filme.imageUrl}">
        <h3>${filme.title}</h3>
          <div class="notaCheck">
            <p>Nota:</p>
              <p class="nota"> ${filme.grade}</p>
                <label>Já vi!
                  <input type="checkbox" name="visto" onClick="filmeMarcado('${filme._id}')"/>
                  </label>
                </div>
                <div class="btns-genre">
                <div class="genero">${filme.genre}</div>
                <div class="del-edit">

                <button class="btn btn-outline-danger row " onClick="deleteFilme('${filme._id}')">Deletar</button>

                <button type="button" class="btn btn-secondary" onClick="updateFilme('${filme._id}')">Editar</button>
                
                </div>
                </div>
                
              </div>
    `)

    if(filme.assistido){
      const card = document.getElementById(filme.id);
      card.classList.add('marcado');
      card.querySelector('input[type=checkbox]').checked = true;
    }

    // console.log(filme)
  });
}

getFilmes();



const submitForm = async (evento) => {
  evento.preventDefault();

  let inputNome = document.querySelector('#title').value;
  let inputGenero = document.querySelector('#genre').value;
  let inputNota = document.querySelector('#grade').value;
  let inputImagem = document.querySelector('#imageUrl').value;



  console.log(evento)



  const filmeCard = {
    title: inputNome,
    genre: inputGenero,
    grade: inputNota,
    imageUrl: inputImagem,

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

    const request = new Request(`${urlApi}/update/${idEdit}`, {
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

  title.value = '';
  genre.value = '';
  grade.value = '';
  imageUrl.value = '';

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

  let titleElement = document.getElementById('title');
  let genreElement = document.getElementById('genre');
  let imageElement = document.getElementById('imageUrl');
  let gradeElement = document.getElementById('grade');

  titleElement.value = filme.title;
  genreElement.value = filme.genre;
  imageElement.value = filme.imageUrl;
  gradeElement.value = filme.grade;



}


const deleteFilme = async (id) => {
  const request = new Request(`${urlApi}/delete/${id}`, { method: 'DELETE', })
  const response = await fetch(request);
  const data = await response.json();
  console.log(data.message);

  itemLista.innerHTML = '';
  getFilmes();
}


const filmeMarcado = async (id)=> {
  console.log('marcou', id)
  
  const filme = await getFilmeById(id);

    let status= false;

    if (!filme.status){
        status =  true
    }

        const assistido = {
            status
        }

        const request = new Request(`${urlApi}/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(assistido),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });

        const response = await fetch(request);
        const result = await response.json();

        card.innerHTML = "";

        getFilmes()


        
        if(checkbox.checked){
          card.classList.add('marcado');
        } else{
          card.classList.remove('marcado');
        }
        console.log(request)

}

