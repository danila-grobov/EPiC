import mailer from "nodemailer";

const emailCredentials = {
    user: "ncl.epic.tool@gmail.com",
    pass: "G(R:fQ+v]Mn7W$/"
}
const emailTransporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: emailCredentials
});

export function emailMessage(message, email) {
    return new Promise((resolve, reject) =>
        emailTransporter.sendMail({
            from: emailCredentials.user,
            to: email,
            subject: "Your registration link",
            text: message
        }, (err, info) => err ? reject(err) : resolve(info)));
}