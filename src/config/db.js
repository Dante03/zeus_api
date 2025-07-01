import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config();

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'testdb',
    connectionLimit: 5
});

export default {
    query: async (sql, params) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query(sql, params);
            return res;
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.end();
        }
    }
};