
//importando o mongoose
const mongoose = require('mongoose');

//connection URL = mongodb://servidor/porta/nomedobanco
// useNewUrlParser = indica para o mongoose usar o novo sistema de URL
//useUnifiedTopology = Mecanismo de monitoramento do banco de dados


const Conn = () => {
    mongoose.connect('mongodb://localhost:27017/FLS-mod3', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('MongoDB CONECTADO, bicho!')
    }).catch((err)=> console.error(err));
}

module.exports = Conn;