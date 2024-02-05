'use strict'

const { signUp } =  require('../services/access.service');

class AccessController {

    signUp = async (req, res, next) => {
        const result = await signUp(req.body);
        return res.status(201).json(result);
    }
}

module.exports = new AccessController();