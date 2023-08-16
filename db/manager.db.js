const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config')

const mysqlPool = mysql.createPool ({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    connectionLimit: dbConfig.connectionLimit
});


module.exports.getConnection = async query => {
    
    let result = {};
    try {
        const connection = await mysqlPool.getConnection(async conn => conn);
            try {
                const [rows] = await connection.query(query);
                result.rows = rows;
                result.status = true;
                connection.release();
                console.log("dbManager result", result)
                return result;
            } catch (err) {
                console.log("Query Error");
                result.status = false;
                result.error = err;
                connection.release();
                console.log("dbManager result", err)
                return result;
            }
    } catch (err) {
        console.log("DB Error");
        result.status = false;
        result.error = err;
        console.log("dbManager result1", err)
        return result;
    }
}



