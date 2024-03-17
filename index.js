const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const pool = mysql.createPool({
    connectionLimit: 10, // Importante para funções Lambda para reuso de conexões
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
});

const secretKey = process.env.JWT_SECRET_KEY; // Use uma chave secreta complexa e armazene de forma segura
const now = Math.floor(Date.now() / 1000);
const expirationTime = 60 * 60;

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let email = event.email;
    let password = event.password;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const query = 'SELECT id, password FROM users WHERE email = ? LIMIT 1';
        connection.query(query, [email], (error, results) => {
            connection.release();

            if (error) {
                callback(error);
            } else if (results.length === 0) {
                callback(null, { statusCode: 404, data: { message: 'Cliente não encontrado.' } });
            } else {
                const user = results[0];
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {

                        const payload = {
                            iss: 'lambda',
                            iat: now,
                            exp: now + expirationTime,
                            nbf: now,
                            jti: crypto.randomBytes(16).toString('hex'),
                            sub: user.id
                        };

                        const token = jwt.sign(payload, secretKey, {algorithm: 'HS256'});
                        callback(null, { statusCode: 200, data: {token: token} });
                    } else {
                        callback(null, { statusCode: 401, data: { message: 'Senha inválida.' }});
                    }
                });
            }

        });

    });
};