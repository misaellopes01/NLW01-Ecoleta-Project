const express = require("express")
const server = express()
//Habilitar o red.body
server.use(express.urlencoded({ extended: true }))
//Pegar a database
const db = require("./database/db")
// Configurando pasta public
server.use(express.static("public"))

// Template engine
const nunjucks =  require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar routes para a minha apliacação
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
server.post("/savepoint", (req, res) => {
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
        req.body.image,    
        req.body.name,    
        req.body.adress,    
        req.body.adress2,    
        req.body.state,    
        req.body.city,    
        req.body.items,    
    ]
    
    function afterInsertData(err) {
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)  
})


server.get("/search", (req, res) => {
    const search =  req.query.search
    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }
    // Pegar os dados da database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }
        const total = rows.length

        // Mostrar a pág com os dados da db
        return res.render("search-results.html", { places: rows, total: total})
    })
})

// Ligar o servidor
server.listen(3001, console.log("running"))