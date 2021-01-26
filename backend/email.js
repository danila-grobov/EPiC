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
        auth: emailCredentials
    });
    return emails.reduce((promise, {email,message}) => {
        return promise.then(
            () => emailMessage(message, email, emailTransporter)
                .then(() => new Promise(resolve => setTimeout(() => resolve(), 1000)))
        )
    }, Promise.resolve()).then(() => emailTransporter.close())
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