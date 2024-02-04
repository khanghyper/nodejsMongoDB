'use strict'

const { signUp } =  require('../services/access.service');

class AccessController {

    signUp = async (req, res, next) => {
        try {
            const result = await signUp(req.body);
            return res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController();