const db = require('../models');

const canUD = (req, user, model) => {
    if (user.__t === 'Teammate') {
        return false;
    } else if (user.__t === 'Artist') {
        if (req.userId != model.artist) {
            return false;
        }
    } else if (user.__t === 'Manager' || user.__t === 'Agent') {
        if (!user.artists.includes(model.artist)) {
            return false;
        }
    }
    return true;
}


const canRead = (req, user, model) => {
    if (user.__t === 'Teammate') {
        return false;
    } else if (user.__t === 'Artist') {
        if (req.userId != model.artist) {
            return false;
        }
    } else if (user.__t === 'Manager' || user.__t === 'Agent') {
        if (!user.artists.includes(model.artist)) {
            return false;
        }
    }
    return true;
}


const canCreate = async (req, user, modelRef) => {
    if (user.__t === 'Teammate') {
        if (modelRef === 'Tour' || modelRef === 'Tourdate') {
            return false;
        }
    } else if (user.__t === 'Manager' || user.__t === 'Agent') {
        if (!user.artists.includes(req.body.artist)) {
            return false;
        }
    }

    return true;
}

const sendTimeOnly = str => {
    let time = str.split('T')[1];
    let div = time.split(':');
    let hour = div[0];
    let minute = div[1];
    return `${hour}:${minute}`

}

module.exports = {
    canRead,
    canUD,
    canCreate,
}