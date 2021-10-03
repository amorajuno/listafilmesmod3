const express = require('express');

const router = express.Router();


const listaFilmes = [
    {
        id: Date.now(),
        nome: "Juno",
        genero: "Comédia dramática",
        nota: "6",
        imagem: "https://www.nit.pt/wp-content/uploads/2018/05/0af40e405b1477709c1562b828e7435a-754x394.jpg"
    },
    {
        id: Date.now(),
        nome: "Mr. Nobody",
        genero: "Drama",
        nota: "8",
        imagem: "https://ufla.br/dcom/wp-content/uploads/2014/02/Mr-Nobody.jpg"
    },
];




router.get('/', (req, res) => {
    res.send(listaFilmes);
})

//[GET] - Single por id
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const index = listaFilmes.findIndex(filme => filme.id == idParam);
    const filme = listaFilmes[index];
    res.send(filme);
})

router.put('/:id', (req, res) => {
    const filmeUpdate = req.body;
    const id = req.params.id;
    let filmeCadastrado = listaFilmes.find((filme) => filme.id == id);

    filmeCadastrado.nome = filmeUpdate.nome;
    filmeCadastrado.genero = filmeUpdate.genero;
    filmeCadastrado.nota = filmeUpdate.nota;
    filmeCadastrado.imagem = filmeUpdate.imagem;

    res.send({
        message: `filme ${filmeCadastrado.id} atualizado!`,
        data: filmeCadastrado
    });


})

//[POST]

router.post('/add', (req, res) => {
    const filme = req.body;
    console.log(filme);
    filme.id = Date.now();
    listaFilmes.push(filme);
    res.status(201).send({
        message: 'Filme adicionado!',
        data: filme
    });

})



//[DELETE]

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const index = listaFilmes.findIndex((filme) =>
        filme.id == id);
    listaFilmes.splice(index, 1);

    res.send({
        message: 'voce excluiu esse título',
    })
})





module.exports = router;