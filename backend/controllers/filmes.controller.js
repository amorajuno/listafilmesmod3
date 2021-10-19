const mongoose = require('mongoose');
const FilmeService = require('./../services/filme.service')

const filmeService = new FilmeService;

class FilmeController {
    getFilmes = async (req,res) => {
        const filmes = await filmeService.findAll();res.send(filmes);
    }

    getFilmeById = async (req,res) => {
        
        const id = req.params.id;

        // tratamento de erro se o id é valido
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(403).send('Id Invalido');
            return;
        }
    
        const filme = await filmeService.findById(id);
    
        // tratamento de erro não exista cadastro no banco de dados.
        if(!filme) {
            res.status(404).send('não encontrado');
            return
        }
    
    res.status(200).send(filme);
    }

    createFilme = async(req,res) => {
        const filme = req.body;
        const filmeSalvo = await filmeService.createFilme(filme);res.send({mssage : `${filmeSalvo} adicionado com sucesso.`})
    }

    editFilme = async (req,res) => {
        const id = req.params.id;
        const filme = req.body;

        await  filmeService.editFilme(id, filme)
        .then(()=>{
            res.status(200).send({message: 'entrada atualizada!'});
        })
        .catch((err) => res.status(500).send({error: `erro : ${err}`}));
    }

    deleteFilme = async (req,res) => {
        const id = req.params.id;
        await filmeService.deleteFilme(id).then(()=> res.status(200).send({message: 'Filme deleted'}));
    }
    
    
}

module.exports = FilmeController;