/**
 * @author Danila Grobov
 */
import {getDBSession} from "./database";
import {escape} from "sqlstring";
import {Store} from "express-session";

const timeToExpire = 1800; // 30 minutes

/**
 * Custom session store for express-session, made to fit our database.
 */
export default class SessionStore extends Store {
    destroy(sid, callback = () => {}) {
        getDBSession( session => {
            session.sql("USE EPiC").execute();
            return session.sql(`
                DELETE FROM SessionStore
                WHERE SId = ${escape(sid)}
            `).execute()
        })
        .then(() => callback(null))
        .catch(error => callback(error.message))
    }
    get(sid, callback = () => {}) {
        getDBSession( session => {
            session.sql("USE EPiC").execute();
            return session.sql(`
                SELECT Data, Expires
                FROM SessionStore
                WHERE SId = ${escape(sid)}
            `).execute()
        })
        .then(result => {
            const fetch = result.fetchOne();
            if(fetch) {
                const [data, expirationTime] = fetch;
                if(expirationTime <= Math.floor( Date.now() / 1000)) {
                    this.destroy(sid, callback);
                } else {
                    const parsedData = JSON.parse(data);
                    callback(null, parsedData)
                }
            } else callback(null,null)
        })
        .catch(error => callback(error.message, null))
    }
    set(sid, data, callback = () => {}) {
        getDBSession( session => {
            const preparedData = JSON.stringify(data);
            const expirationTime = Math.floor(Date.now() / 1000) + timeToExpire;
            session.sql("USE EPiC").execute();
            return session.sql(`
                INSERT INTO SessionStore (SId, Data, Expires)
                VALUES (${escape(sid)}, ${escape(preparedData)}, ${escape(expirationTime)})
                ON DUPLICATE KEY
                UPDATE Data=${escape(preparedData)}, Expires=${escape(expirationTime)}
            `).execute()
        })
        .then((response) => callback(null))
        .catch(error => callback(error.message))
    }
    touch(sid, data, callback = () => {}) {
        getDBSession( session => {
            const expirationTime = Math.floor(Date.now() / 1000) + timeToExpire;
            session.sql("USE EPiC").execute();
            return session.sql(`
                UPDATE SessionStore
                SET Expires=${escape(expirationTime)}
                WHERE SId=${escape(sid)}
            `).execute()
        })
        .then(() => callback(null))
        .catch(error => callback(error.message))
    }
}