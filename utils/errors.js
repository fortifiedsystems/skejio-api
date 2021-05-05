// Company Errors
const NULL_COMPANIES = 'There are no companies/agencies registered.';
const NULL_COMPANY = 'This company/agency does not exist in the database.';
const CANNOT_CREATE_COMPANY = 'Only Manager or Agent accounts can create companies/agencies.';
const CO_ACCESS_DENIED = 'You either do not have access to this company/agency, or I (the computer) could not find one with this ID';

// Auth Errors
const UNIQUE_ERR = 'Account with this email or username is already registered.'
const INVALID_LOGIN = 'Email or password is incorrect';
const TRY_AGAIN = 'Something went wrong. Please try again.';

// Tour Errors
const UNAUTHORIZED = 'You are not authorized to take this action.';

const REPORT_ALREADY_FILED = 'A report has already been filed for this tourdate. You can edit this report on the specific page for this tourdate.';

const ARTISTS_ONLY = 'Only users with account type artist may take this action'

module.exports = {
    NULL_COMPANIES,
    NULL_COMPANY,
    CANNOT_CREATE_COMPANY,
    UNIQUE_ERR,
    INVALID_LOGIN,
    TRY_AGAIN,
    CO_ACCESS_DENIED,
    UNAUTHORIZED,
    REPORT_ALREADY_FILED,
    ARTISTS_ONLY
}