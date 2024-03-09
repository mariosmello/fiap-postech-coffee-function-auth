const mysql = require('mysql');

// Configuração do banco de dados
const pool = mysql.createPool({
    connectionLimit: 10, // Importante para funções Lambda para reuso de conexões
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
});

exports.handler = (event, context, callback) => {
    // Previne o término da conexão antes da conclusão da query
    context.callbackWaitsForEmptyEventLoop = false;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        // Execute uma query
        connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
            connection.release();

            if (error) callback(error);
            else callback(null, {statusCode: 200, body: JSON.stringify({solution: results[0].solution})});
        });
    });
};