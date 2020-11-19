// Company Errors
const NULL_COMPANIES = 'There are no companies registered.';
const NULL_COMPANY = 'This company does not exist in the database.';
const CANNOT_CREATE_COMPANY = 'Only Manager or Agent accounts can create companies/agencies.';

// Auth Errors
const UNIQUE_ERR = 'Account with this email or username is already registered.'
const INVALID_LOGIN = 'Email or password is incorrect';
const TRY_AGAIN = 'Something went wrong. Please try again.';

module.exports = {
    NULL_COMPANIES,
    NULL_COMPANY,
    CANNOT_CREATE_COMPANY,
    UNIQUE_ERR,
    INVALID_LOGIN,
    TRY_AGAIN,
}