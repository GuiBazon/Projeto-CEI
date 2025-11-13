const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost', // mudar para o seu IP
    user:'alunods', // mudar para o seu USER do Mysql
    password:'senai@604', // mudar para a sua senha do USER
    database:'cei' // mudar para o seu Database JA CRIADO
})

module.exports = pool;
