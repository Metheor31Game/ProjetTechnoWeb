import mysql from 'mysql2/promise';

let connection

export async function initialiseDatabase() {
    try{
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'spot',
            password: 'spot-passwd',
            database: 'dbSpotMinder'
        })
    } catch(err) {
        console.error('Erreur de la connection à la base de donnée : ', err)
        process.exit(1);
    }
}