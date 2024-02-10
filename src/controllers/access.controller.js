'use strict'

const { signUp, login, logout, handleRefreshToken } =  require('../services/access.service');

class AccessController {

    handleRefreshToken = async (req, res, next) => {
        const result = await handleRefreshToken(req.body.refreshToken);
        return res.status(200).json(result);
    }

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