const express = require('express')
const app = express()
const port = 3000

console.log("Node Running!")

const config = {
    host: 'mysql-db',
    user: 'root',
    password: 'root',
    database: 'peopledb'
}

const insertNewPerson = () => {
    console.log("Inserindo nova pessoa")
    executeQuery(`INSERT INTO people(name) values ('Tomas')`);
}

const createTableIfNotExist = () => {
    console.log("Criando tabela de pessoas se não existir")
    executeQuery("CREATE table if not exists people (id int auto_increment, name varchar(255), primary key (id))")
}

const selectNamesFromPeople = (callback) => {
    console.log("Pesquisando pessoas inseridas")
    return executeQuery(`SELECT name FROM people`, callback)
}

const executeQuery = async function(sql, callback) {
    try {
        const mysql = require('mysql')
        const connection = mysql.createConnection(config)
        
        const result = await connection.query(sql, callback)
        connection.end()
        return result

    } catch (e) {
        console.log("Error with DB")
        return null
    }
}

createTableIfNotExist()
insertNewPerson()

const header = '<h1>Full Cycle</h1><h2>- Lista de nomes cadastrada no banco de dados.</h2>'

app.get('/', (_, res) => {let names;
    selectNamesFromPeople((_, result) => { 
        const names = result.map(v => `<p>${v.name}</p>`).join("")
        res.send(header + names)
    })
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
});