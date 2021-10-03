// CRUD


//importando o express
const express = require('express');


//importa o CORS
const cors = require('cors');
//inicializando o express atribuindo-o a uma constante
const app = express();
//usando JSON como middleware
app.use(express.json());

//para utilizar o cors
app.use(cors());


const pathRouter = require('./routes/locate.routes');
app.use('/filmes', pathRouter);


app.get('/', (req,res) =>{
    res.send('alouu');
})

// definindo a porta da aplicação

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`)

})