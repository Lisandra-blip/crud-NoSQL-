// Operações CRUD Node.js com persistencia de dados no mongoDB local
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//
var Funcionario = require('./app/models/funcionarios')
var Mercadoria = require('./app/models/mercadoria')
//
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Maneira Local: MongoDb:
mongoose.connect('mongodb://localhost:27017/mongo-crud');


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//porta de entrada
var port = process.env.port || 8000;

//rotas API
var router = express.Router();

//middleware escreve se a req foi
router.use(function(req, res, next) {
    console.log('Okey');
    next(); 
});


//base
router.get('/', function(rec, res){
    res.json({ message: 'CRUDs (Create, Read, Update e Delete) com persistência de dados em banco de dados não relacionais (NoSQL)'})
});


//CRUD(mercadorias)--------------------------------------------------------------
//POST(Create)
router.route('/mercadorias')

.post(function(req, res) {
    var mercadoria = new Mercadoria(); 

    mercadoria.nome = req.body.nome;
    mercadoria.categoria = req.body.categoria;
    mercadoria.preco = req.body.preco;
    mercadoria.descricao = req.body.descricao;

    mercadoria.save(function(error) {
        if(error)
            res.send('Erro : ' + error);
        
        res.json({ message: 'Cadastro concluido!' });
    });
})

//GET(Read)
    .get(function(req, res) {
        Mercadoria.find(function(error, mercadorias) {
            if(error) 
                res.send('Erro: ' + error);

            res.json(mercadorias);
        });
    });

//pega pelo id
router.route('/mercadorias/:mercadorias_id')

    .get(function(req, res) {

        Mercadoria.findById(req.params.mercadorias_id, function(error, mercadoria) {
            if(error)
                res.send('Mercadoria não encontrada!' + error);

            res.json(mercadoria);
        });   
    })

//UPDATE(Update)
    .put(function(req, res) {

        Mercadoria.findById(req.params.mercadorias_id, function(error, mercadoria) {
            if(error)
                res.send('Mercadoria não encontrada!' + error);
        
                mercadoria.nome = req.body.nome;
                mercadoria.categoria = req.body.categoria;
                mercadoria.preco = req.body.preco;
                mercadoria.descricao = req.body.descricao;
                mercadoria.save(function(error) {
                    if(error)
                        res.send('Erro: ' + error);

                    res.json({ message: 'Mercadoria atualizada com sucesso' });
                });
        });

    })

//DELETE(Delete)

    .delete(function(req, res){
        Mercadoria.remove({
            _id: req.params.mercadorias_id
        }, function(error) {
            if(error)
                res.send("id não encontrado");

                res.json({message:'Mercadoria excluida'})
        });
    });


//CRUD(funcionarios)---------------------------------------------------------------
//POST(Create)
router.route('/funcionarios')

.post(function(req, res) {
    var funcionario = new Funcionario(); 

    funcionario.nome = req.body.nome;
    funcionario.cargo = req.body.cargo;
    funcionario.email = req.body.email;
    funcionario.salario = req.body.salario;

    funcionario.save(function(error) {
        if(error)
            res.send('Erro: ' + error);
        
        res.json({ message: 'Cadastro concluido' });
    });
})

//GET(Read)
    .get(function(req, res) {
        Funcionario.find(function(error, funcionarios) {
            if(error) 
                res.send('Erro: ' + error);

            res.json(funcionarios);
        });
    });

//pega  pelo id
router.route('/funcionarios/:funcionario_id')

    .get(function(req, res) {

        Funcionario.findById(req.params.funcionario_id, function(error, funcionario) {
            if(error)
                res.send('Funcionario não encontrado: ' + error);

            res.json(funcionario);
        });   
    })

//UPDATE(Update)
    .put(function(req, res) {

        Funcionario.findById(req.params.funcionario_id, function(error, funcionario) {
            if(error)
                res.send('Funcionario não encontrado' + error);
        
                funcionario.nome = req.body.nome;
                funcionario.cargo = req.body.cargo;
                funcionario.email = req.body.email;
                funcionario.salario = req.body.salario;

                funcionario.save(function(error) {
                    if(error)
                        res.send('Erro: ' + error);

                    res.json({ message: 'Funcionario atualizado!' });
                });
        });

    })

//DELETE(Delete)

    .delete(function(req, res){
        Funcionario.remove({
            _id: req.params.funcionario_id
        }, function(error) {
            if(error)
                res.send("Funcionario não encontrado");

                res.json({message:'Funcionario excluido'})
        });
    });

//CRUD--------------------------------------------------------------

app.use('/mercado', router);

app.listen(port);
console.log("iniciando" + port);

