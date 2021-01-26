/**
 * @author Danila Grobov
 */
import mysqlx from "@mysql/xdevapi";

const dbCredentials = {
    user: 'root',
    password: 'password',
    host: 'db',
    port: '33060'
};
/**
 * Tests the connection to the database, shows Connected! message if successful.
 */
export const testDBConnection = () => {
    mysqlx
        .getSession(dbCredentials)
        .then(session => {
            console.log("Connected!");
        })
        .catch(err => {
            console.log(err);
        });
}

/**
 * Provides a session for manipulating the database to the supplied callback function.
 * @param callback(session)
 * @returns Promise(callback())
 */
export function getDBSession(callback) {
    return mysqlx
        .getSession(dbCredentials)
        .then(session => {
            return callback(session).then(async data => {
                await session.close();
                return data;
            });
        })
        .catch(err => {
            console.log(err);
        });
}