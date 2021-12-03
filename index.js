//Init do node.js
const http = require("http");

//Framework
const express = require("express");
const app = express();
//Requisicão para a raiz
app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/" + "index.html");
});

//Fim das requisições
//Server escutando
var server = http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));


var io = require('socket.io').listen(server);

var msg = Array();
var msgCmd = Array();

io.on('connection', (socket) => {
  console.log('Um usuario conectado: ' + socket.id);
  socket.on('disconnect', () => {
    console.log('Usuario ' + socket.id + ' desconectado');
  });
  socket.on('comando', (cmd) => {
    console.log('Usuario ' + socket.id + ' executou o comando "' + cmd + '"');
    var resposta = shell.exec(cmd, {silent:true}).stdout;
    var rsp = {'cmd':cmd, 'rsp':resposta};
    
    if(rsp.rsp === ''){
      rsp.rsp = 'Comando não encontrado ou sem resposta.';
    }

    io.emit('resposta', rsp);
  });
})

var shell = require('shelljs');
