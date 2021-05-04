const db = require('../models');
const errors = require('../utils/errors');

module.exports = async (req, res, next) => {
    const user = await db.User.findById(req.userId);
    const baseUrl = req.baseUrl;
    const path = req.route.path;
    const method = req.method;

    if (baseUrl === '/api/v1/user') {
        if (method === 'GET') {
            if (path === '/search') {
                if (user.__t === 'Artist') {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    })
                }
            }
        }
    } else if (baseUrl === '/api/v1/agencies') {
        if (path === '/') {
            if (method === 'POST') {
                if (
                    user.__t === 'Artist' ||
                    user.__t === 'Manager' ||
                    user.__t === 'Teammate'
                ) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED
                    });
                }
            }
        } else if (path === '/:id') {
            if (method === 'PUT' || method === 'DELETE') {
                if (
                    user.__t === 'Artist' ||
                    user.__t === 'Manager' ||
                    user.__t === 'Teammate'
                ) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    })
                }
            }
        }
    } else if (baseUrl === '/api/v1/comments') {
        if (method === 'PUT' || method === 'DELETE') {
            if (path === '/:id') {
                const comment = await db.Comment.findById(req.params.id);

                if (req.userId != comment.author) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    });
                }
            }
        } else if (method === 'POST') {
            const thread = await db.Thread.findById(req.body.thread);
            const tourdate = await db.Tourdate.findById(thread.tourdate);

            if (user.__t === 'Artist') {
                if (tourdate.artist != req.userId) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    });
                }
            } else {
                if (!user.artists.includes(tourdate.artist)) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    })
                }
            }
        }
    } else if (baseUrl === '/api/v1/threads') {
        if (method === 'PUT' || method === 'DELETE') {
            const thread = await db.Thread.findById(req.params.id);
            if (req.userId != thread.author) {
                return res.status(403).json({
                    msg: errors.UNAUTHORIZED,
                });
            }
        } else if (method === 'POST') {
            if (user.__t === 'Artist') {
                if (req.body.artist != req.userId) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    });
                }
            } else {
                if (!user.artists.includes(req.body.artist)) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    });
                }
            }
        }
    } else if (baseUrl === '/api/v1/tourdates') {
        if (method === 'PUT' || method === 'DELETE') {
            const tourdate = await db.Tourdate.findById(req.params.id);
            if (user.__t === 'Artist') {
                if (req.userId != tourdate.artist) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    });
                }
            } else {
                if (!user.artists.includes(tourdate.artist)) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    });
                }
            }
        } else if (method === 'POST') {
            if (user.__t === 'Artist') {
                if (req.body.artist != req.userId) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    })
                }
            } else {
                if (!user.artists.includes(req.body.artist)) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    });
                }
            }
        }
    } else if (baseUrl === '/api/v1/tours') {
        if (path === '/') {
            if (method === 'POST') {
                if (user.__t != 'Artist') {
                    if (!user.artists.includes(req.body.artist)) {
                        res.status(403).json({
                            msg: errors.UNAUTHORIZED,
                        });
                    }
                } else {
                    if (req.userId != req.body.artist) {
                        res.status(403).json({
                            msg: errors.UNAUTHORIZED,
                        });
                    }
                }
            } else if (method === 'GET') {
                if (user.__t !== 'Artist') {
                    if (!user.artists.includes(req.query.artist)) {
                        res.status(403).json({
                            msg: errors.UNAUTHORIZED,
                        });
                    }
                }
            }
        } else if (path === '/:id') {
            const tour = await db.Tour.findById(req.params.id);
            if (user.__t !== 'Artist') {
                if (!user.artists.includes(tour.artist)) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    });
                }
            } else {
                if (req.userId !== tour.artist) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED
                    })
                }
            }
        }
    } else if (baseUrl === '/api/v1/merch') {
        if (path === '/' || path === '/:id') {
            if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
                if (user.__t === 'Agent') {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    });
                } else if (user.__t === 'Teammate') {
                    if (
                        !user.isAdmin ||
                        !user.artists.includes(req.body.artist)
                    ) {
                        return res.status(403).json({
                            msg: errors.UNAUTHORIZED,
                        });
                    }
                } else if (user.__t === 'Manager') {
                    if (!user.artists.includes(req.body.artist)) {
                        return res.status(403).json({
                            msg: errors.UNAUTHORIZED,
                        });
                    }
                } else if (user.__t === 'Artist') {
                    if (req.body.artist != req.userId) {
                        return res.status(403).json({
                            msg: errors.UNAUTHORIZED,
                        });
                    }
                }
            } else if (method === 'GET') {
                if (path === '/:id') {
                    const item = await db.MerchItem.findById(req.params.id);

                    if (user.__t === 'Artist') {
                        if (item.artist != req.userId) {
                            return res.status(403).json({
                                msg: errors.UNAUTHORIZED
                            });
                        }
                    } else {
                        if (!user.artists.includes(req.userId)) {
                            return res.status(403).json({
                                msg: errors.UNAUTHORIZED
                            });
                        }
                    }
                }
            }
        }
    } else if (baseUrl === '/api/v1/todos') {
        console.log('no middleware for todos yet.')
    } else if (baseUrl === '/api/v1/mgmt') {
        if (path === '/') {
            if (method === 'POST') {
                if (
                    user.__t === 'Artist' ||
                    user.__t === 'Agent' ||
                    user.__t === 'Teammate'
                ) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED
                    });
                }
            }
        } else if (path === '/:id') {
            if (method === 'PUT' || method === 'DELETE') {
                if (
                    user.__t === 'Artist' ||
                    user.__t === 'Agent' ||
                    user.__t === 'Teammate'
                ) {
                    return res.status(403).json({
                        msg: errors.UNAUTHORIZED,
                    })
                }
            }
        }
    }

    next();
}