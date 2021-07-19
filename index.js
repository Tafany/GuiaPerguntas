const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
//Database
connection
    .authenticate()
    .then(() => {
      console.log("Conexão feita com banco de dados!")
    })
    .catch((msgErro) =>{
      console.log(msgErro);
    })
 
// express vai usar o EJS como View engines
app.set('view engine','ejs');
app.use(express.static('public')); // arquivos estáticos
// Body parser
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
//Rotas
app.get("/",(req,res) => { 
   Pergunta.findAll({ raw: true, order:[
     ['id','DESC'] // ASC = CRESCENTE ||
   ]}).then(perguntas => { 
      console.log(perguntas);
      res.render("index",{
            perguntas: perguntas
      });// vai renderizar o arquivo index na tela para usuário
   });
});

app.get("/perguntar",(req,res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;+

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
      res.redirect("/");
  });
});

app.get("/pergunta/:id",(req ,res) => {
      var id = req.params.id;
      Pergunta.findOne({
        where: {id: id}
      }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada
           res.render("pergunta");
        }else{// Não encontrada
           res.redirect("/");
        }
      });
});

app.listen(8080,()=>{console.log("App rodando!");});
