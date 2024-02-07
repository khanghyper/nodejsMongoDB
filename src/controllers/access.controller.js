'use strict'

const { signUp, login, logout } =  require('../services/access.service');

class AccessController {

    logout = async (req, res, next) => {
        const result = await logout(req.keyStore);
        return res.status(200).json(result);
    }

    login = async (req, res, next) => {
        const result = await login(req.body);
        return res.status(200).json(result);
    }

    signUp = async (req, res, next) => {
        const result = await signUp(req.body);
        return res.status(201).json(result);
    }
}

module.exports = new AccessController();