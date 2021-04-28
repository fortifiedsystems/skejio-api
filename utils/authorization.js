/**
 * @function canEditOrDelete()
 * @description checks if current user is allowed to edit or delete current model
 * @param {object} req request object
 * @param {object} user user object
 * @param {object} model specific instance of the model to check
 * Would be best to declare a variable and assign the specific instance
 * of the model that needs to be checked, then pass it in to the fxn.
 * @returns Boolean
 */
const canEditOrDelete = (req, user, model) => {
    if (user.__t === 'Teammate') {
        if (
            !user.isAdmin ||
            !user.artists.includes(model.artist)
        ) {
            return false;
        }
    } else if (user.__t === 'Artist') {
        if (req.userId != model.artist) {
            return false;
        }
    } else if (
        user.__t === 'Manager' ||
        user.__t === 'Agent'
    ) {
        if (!user.artists.includes(model.artist)) {
            return false;
        }
    }
    return true;
}



/**
 * @function canRead()
 * @description Checks if the current user is allowed to read the current model
 * @param {object} req request object
 * @param {object} user current user object
 * @param {object} model specific instance of the model to check
 * Would be best to declare a variable and assign the specific instance
 * of the model that needs to be checked, then pass it in to the fxn.
 * @returns Boolean
 */
const canRead = (req, user, model) => {
    if (user.__t === 'Artist') {
        if (req.userId != model.artist) {
            return false;
        }
    } else if (
        user.__t === 'Teammate' ||
        user.__t === 'Manager' ||
        user.__t === 'Agent'
    ) {
        if (
            !user.isAdmin ||
            !user.artists.includes(model.artist)
        ) {
            return false;
        }
    }
    return true;
}



/**
 * @function canCreate()
 * @description Checks if the current user is allowed to create the current model.
 * @param {object} req request object
 * @param {object} user user object.
 * @param {string} modelRef name of the model capitalized as String
 * @returns Boolean
 */
const canCreate = async (req, user, modelRef) => {
    if (user.__t === 'Teammate') {
        if (
            modelRef === 'Tour' ||
            modelRef === 'Tourdate'
        ) {
            if (
                !user.isAdmin ||
                !user.artists.includes(req.body.artist)
            ) {
                return false;
            }
        } else if (modelRef === 'Thread') {
            if (!user.artists.includes(req.body.artist)) {
                return false;
            }
        }
    } else if (user.__t === 'Manager' || user.__t === 'Agent') {
        if (!user.artists.includes(req.body.artist)) {
            return false;
        }
    }
    return true;
}



module.exports = {
    canRead,
    canEditOrDelete,
    canCreate,
}