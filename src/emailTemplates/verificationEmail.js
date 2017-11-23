const baseUrl = require('../../config').get().urls.baseUrl;

module.exports = {
    subject: 'Verify your email address',
    body
};

function body(recipient, token) {
    return `Hi${recipient.fname ? ' ' + recipient.fname : ''},<br/><br/>
            Thanks for signing up for NBAStatsComparison.com!<br/><br/>
            <b>Please click the link below to complete your registration:</b><br/>
            <a href="${baseUrl}/auth/verify-email?token=${token}">${baseUrl}/auth/verify-email?token=${token}</a><br/><br/>
            Enjoy!<br/>
            The NBA Stats Team`;
}