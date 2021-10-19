const express = require('express');

const router = express.Router();

const FilmeController = require('./../controllers/filmes.controller');

const filmeController = new FilmeController();


//[GET]
router.get('/', filmeController.getFilmes);

//[GET] por id
router.get('/:id', filmeController.getFilmeById);

//[POST] - Cria uma nova entrada no banco de dados
router.post('/add', filmeController.createFilme);

//[PUT] - Atualiza uma entrada do banco de dados.
router.put('/update/:id', filmeController.editFilme);

//[DELETE]
router.delete('/delete/:id', filmeController.deleteFilme);



module.exports = router;



// // abaixo desta linha está comentado como ficavam as funções no arquivo .routes.js sem a divisão pelo MVC

// //
// // const listaFilmes = [{}]
// //[
// //     {
// //         id: 1,
// //         nome: "Mr. Nobody",
// //         genero: "Drama",
// //         nota: "8",
// //         imagem: "https://ufla.br/dcom/wp-content/uploads/2014/02/Mr-Nobody.jpg",
// //         visto: false,
// //     },
// // ];


// router.get('/filmes', (req,res)=>{
//     Filme.find({}).then((filmes)=>{
//         console.log(filmes);
//         res.send(filmes);
//     }).catch((err)=>console.log(err));
// })

// // //[GET] - Single por id

// router.get('/filmes/findById/:id', async (req,res)=>{
//     const filmeById= await Filme.findOne({_id: req.params.id })
//     res.send(filmeById);
// });
// // router.get('/filmes/:id', (req, res) => {
// //     const idParam = req.params.id;
// //     const index = listaFilmes.findIndex(filme => filme.id == idParam);
// //     const filme = listaFilmes[index];
// //     res.send(filme);
// // })

// //[PUT]
// router.put('/filmes/update/:id', async (req, res)=>{
//     await Filme.updateOne({ _id: req.params.id}, req.body).then(()=>{
//         res.status(200).send({
//             message: 'Devidamente atualizado',
//         })
//         .catch((err) => {
//             console.log(err),
//             res.status(400).send({
//                 error: err
//             })
//         })
//     })
// })
// // router.put('/filmes/:id', (req, res) => {
// //     const filmeUpdate = req.body;
// //     const id = req.params.id;
// //     let filmeCadastrado = listaFilmes.find((filme) => filme.id == id);

// //     filmeCadastrado.nome = filmeUpdate.nome;
// //     filmeCadastrado.genero = filmeUpdate.genero;
// //     filmeCadastrado.nota = filmeUpdate.nota;
// //     filmeCadastrado.imagem = filmeUpdate.imagem;

// //     res.send({
// //         message: `filme ${filmeCadastrado.id} atualizado!`,
// //         data: filmeCadastrado
// //     });


// // })

// //[POST]

// router.post('/add', async (req,res) => {
//     await Filme.create(req.body)
//     .then(()=>{
//         res.status(201).send({
//             message: 'Criada com sucesso!'
//         })
//     }).catch((err)=>{
//         res.status(400).send({err: 'algo errado não está certo :/'})
//         console.log(err);
//     })
// })




// //[DELETE]
// router.delete('/filmes/delete/:id', async (req,res)=> {
//     const idToDelete = await Filme.deleteOne({ _id: req.params.id});
//     res.send({
//         message:'excluido com sucesso',
//         data: idToDelete
//     })
// })


// // router.put('/filmes/:id/visto', (req, res)=> {
// //     const id = req.params.id;
// //     const visto = req.body.visto;
// //     console.log(`visto:${visto}`);
// //     const index = listaFilmes.findIndex((filme) => filme.id == id);
// //     listaFilmes[index].visto = visto;
// //     console.log(`filme a atualizar:${JSON.stringify(listaFilmes[id])}`)
// //     res.send({
// //         message: 'esse filme já tá batido',
// //     })
// // })


