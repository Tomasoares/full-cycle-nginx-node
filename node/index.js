const express = require('express');
const app = express();
const port = 3000;

console.log("Node Running!")

const config = {
    host: 'mysql-db',
    user: 'root',
    password: 'root',
    database: 'peopledb'
};

const insertNewPerson = () => {
    executeQuery(`INSERT INTO people(name) values ('Tomás')`);
};

const selectNamesFromPeople = () => {
    executeQuery(`SELECT name FROM people`)
};

const executeQuery = (sql) => {
    try {
        const mysql = require('mysql');
        const connection = mysql.createConnection(config);
        
        connection.query(sql);
        connection.end();
    } catch (e) {
        console.log("Error with DB");
    }
}

insertNewPerson();

app.get('/', (_, res) => {
    res.send('<h1>Full Cycle</h1><h2>- Lista de nomes cadastrada no banco de dados.</h2>')
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
});