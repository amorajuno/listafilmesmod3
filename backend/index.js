// importando o express:

//inicializando o express atribuindo-o a uma constante
const express = require('express');



// importando o Model Filme
const Filme = require('./models/filme')

//inicializa o express
const app = express();

app.use(express.json());

const Conn = require('./conn/conn');

Conn();

//importa o CORS
const cors = require('cors');

//para utilizar o cors
app.use(cors());

const pathRouter = require('./routes/locate.routes');
app.use('/filmes', pathRouter);


app.get('/', (req,res) =>{
    res.send('alouu');
})

// definindo a porta da aplicação


//criando estrutura inicial para a Filme

//
//como promise then and catch


// app.get('/filmes', (req,res)=>{
//     Filme.find({}).then((filmes)=>{
//         console.log(filmes);
//         res.send(filmes);
//     }).catch((err)=>console.log(err));
// })

// // ou como promise async await

// app.get('/filmeslista', async(req,res) => {
//     const filmes = await Filme.find();
//     console.log(filmes);
//     res.send(filmes);
// })

// //[GET] que retorna a Filme por ID
// app.get('/filmes/findById/:id', async (req,res)=>{
//     const filmeById= await Filme.findOne({_id: req.params.id })
//     res.send(filmeById);
// });

// //[GET] pelo parametro titulo
// app.get('/filmes/findByTitle/:title', async (req,res)=>{
//     const filmeByTitle = await Filme.find({ title: req.params.title })
//     res.send(filmeByTitle);
// })

// //[POST]
// app.post('/add', async (req,res) => {
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


// // [PUT]
// app.put('/filmes/update/:id', async (req, res)=>{
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

// //[DELETE]
// app.delete('/filmes/delete/:id', async (req,res)=> {
//     const idToDelete = await Filme.deleteOne({ _id: req.params.id});
//     res.send({
//         message:'excluido com sucesso',
//         data: idToDelete
//     })
// })



const port = 3000; //
app.listen(port, ()=>{
    console.log(`app rodando na porta ${port}`);
});