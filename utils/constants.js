const EMAIL_VALIDATE = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_VALIDATE = /^(?=.*\d)(?=.* [a - z])(?=.* [A - Z])(?=.* [a - zA - Z]).{ 8,} $/;
const PHONE_VALIDATE = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

module.exports = {
    EMAIL: EMAIL_VALIDATE,
    PASSWORD: PASSWORD_VALIDATE,
    PHONE: PHONE_VALIDATE
};