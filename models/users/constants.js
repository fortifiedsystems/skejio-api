const EMAIL_VERIFY = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_VERIFY = /^(?=.*\d)(?=.* [a - z])(?=.* [A - Z])(?=.* [a - zA - Z]).{ 8,} $/gm

module.exports = {
    EMAIL: EMAIL_VERIFY,
    PASSWORD: PASSWORD_VERIFY,
};