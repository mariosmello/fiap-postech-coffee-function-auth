const mysql = require('mysql');

// Configuração da conexão com o banco de dados MySQL
const dbConfig = {
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
};

exports.handler = function(event, context) {
    let connection = mysql.createConnection(dbConfig);

    return new Promise((resolve, reject) => {
        connection.connect(err => {
            if (err) reject({ statusCode: 500, body: err.toString() });

            resolve({
                statusCode: 200
            });
        });
    });
};