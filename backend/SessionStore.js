import {getDBSession} from "./database";
import {escape} from "sqlstring";
import {Store} from "express-session";

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
                SELECT Data
                FROM SessionStore
                WHERE SId = ${escape(sid)}
            `).execute()
        })
        .then(result => {
            const fetch = result.fetchOne();
            if(fetch) {
                const [data] = fetch;
                const parsedData = JSON.parse(data);
                callback(null, parsedData)
            } else callback(null,null)
        })
        .catch(error => callback(error.message, null))
    }
    set(sid, data, callback = () => {}) {
        getDBSession( session => {
            const preparedData = JSON.stringify(data);
            session.sql("USE EPiC").execute();
            return session.sql(`
                INSERT INTO SessionStore (SId, Data)
                VALUES (${escape(sid)}, ${escape(preparedData)})
                ON DUPLICATE KEY
                UPDATE Data=${escape(preparedData)}
            `).execute()
        })
        .then(() => callback(null))
        .catch(error => callback(error.message))
    }
}