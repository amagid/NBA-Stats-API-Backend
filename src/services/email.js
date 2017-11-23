const emailConfig = require('../../config').get().email;
const email = require('@sendgrid/mail');
email.setApiKey(emailConfig.apiKey);
const emailTemplates = require('../emailTemplates');

module.exports = {
    sendVerificationEmail
};

//Final sending settings for all emails
function send(msg) {
    //Add subject prefix
    msg.subject = `[NBA Stats] ${msg.subject}`;
    //send
    return email.send(msg)
        .then(() => {
            return { message: 'Email Sent Successfully' };
        })
        .catch(err => {
            throw APIError(err.code || 500, err.message || 'Email Send Failed', err);
        });
}

//Construct verification email
function sendVerificationEmail(recipient, token) {
    const template = emailTemplates.verificationEmail;
    const msg = {
        to: recipient.email,
        from: emailConfig.fromEmail,
        subject: template.subject,
        html: template.body(recipient, token)
    };
    return send(msg);
}