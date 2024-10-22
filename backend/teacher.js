/**
 * @author Danila Grobov
 */
import {getDBSession} from "./database";
import {escape} from "sqlstring";
import {hashPassword} from "./students";

/**
 * Determines if a teacher with supplied username and password exists.
 * @param username
 * @param password
 * @returns does the teacher exist.
 */
export function getTeacher(username, password) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        return session.sql(`
            SELECT Pwd, Email
            FROM Teachers
            WHERE Username=${escape(username)}
        `).execute()
    }).then(res => {
        const data = res.fetchOne();
        if(data) {
            const salt = data[0].slice(32,64);
            const hashedPassword = hashPassword(password, salt);
            return data[0] === hashedPassword ? data[1] : false;
        } return false;
    });
}