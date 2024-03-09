const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY; // Use uma chave secreta complexa e armazene de forma segura

// Configuração do banco de dados
const pool = mysql.createPool({
    connectionLimit: 10, // Importante para funções Lambda para reuso de conexões
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
});

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const { email, password } = JSON.parse(event.body);

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const query = 'SELECT email, password FROM users WHERE email = ? LIMIT 1';
        connection.query(query, [email], (error, results) => {
            connection.release();

            if (error) {
                callback(error);
            } else if (results.length === 0) {
                callback(null, { statusCode: 404, body: JSON.stringify({ message: 'Usuário não encontrado.' }) });
            } else {
                const user = results[0];
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
                        callback(null, { statusCode: 200, body: JSON.stringify({ token }) });
                    } else {
                        callback(null, { statusCode: 401, body: JSON.stringify({ message: 'Senha inválida.' }) });
                    }
                });
            }

        });

    });
};