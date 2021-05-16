// Importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()
// Criar a database
const db = new sqlite3.Database("./src/database/database.db")

//Utilização da db
db.serialize( () => {
    // 1 - CRIAÇÃO DA TABELA
    /* db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    // 2 - INSERÇÃO DE DADOS
    const query = `
                INSERT INTO places ( 
                    image,
                    name,
                    adress,
                    adress2,
                    state,
                    city,
                    items) 
                VALUES (
                    ?,?,?,?,?,?,?);`
    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "Papersider",
        "Guilherme Gembalha, Jardim Américo",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"]
    
    function afterInsertData(err) {
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    db.run(query, values, afterInsertData)
    // 3 - CONSULTA DE DADOS
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err){
            return console.log(err)
        }
        console.log("Eis seus registos")
        console.log(rows)
    }) */


    // 4 - DELETANDO OS DADOS
    /*
     db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){ 
        if(err){
            return console.log(err)
        }
        console.log("Registo deletado") */
     
})

module.exports = db