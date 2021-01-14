import mailer from "nodemailer";

const emailCredentials = {
    user: "ncl.epic.tool@gmail.com",
    pass: "G(R:fQ+v]Mn7W$/"
}

export function sendMessagesInBulk(emails) {
    const emailTransporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: emailCredentials,
        pool: true
    });
    const chunkSize = 10;
    const emailsInChunks = [];
    let temp = [];
    emails.map(
        (email, index) => {
            if(index % chunkSize === 0 && index !== 0) {
                emailsInChunks.push(temp)
                temp = [];
            }
            temp.push(email);
        }
    )
    emailsInChunks.push(temp);
    return emailsInChunks.reduce((promise,chunk) => {
        return promise.then(() =>
            Promise.all(
                chunk.map(({email, message}) =>
                    emailMessage(message,email, emailTransporter)
                ))
            .then(() => new Promise(resolve => setTimeout(() => resolve(),2000)))
        )
    },Promise.resolve()).then(() => emailTransporter.close());
}
export function emailMessage(message, email, emailTransporter) {
    return new Promise((resolve, reject) =>
        emailTransporter.sendMail({
            from: emailCredentials.user,
            to: email,
            subject: "Your registration link",
            text: message
        }, (err, info) => err ? reject(err) : resolve(info)));
}