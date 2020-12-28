import mysqlx from "@mysql/xdevapi";
const dbCredentials = {
    user: 'root',
    password: 'password',
    host: 'db',
    port: '33060'
};
export const testDBConnection = () => {
    mysqlx
        .getSession(dbCredentials)
        .then(session => {
            console.log("Connected!");
        })
        .catch(err => {
            console.log(err)
        });
}
export function getDBSession(callback) {
    return mysqlx
        .getSession(dbCredentials)
        .then(session => {
            return callback(session);
        })
        .catch(err => {
            console.log(err)
        });
}