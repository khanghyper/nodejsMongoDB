'use strict'



const {findById} = require("../services/apiKey.service");
const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try{
        const key = req.headers[HEADER.API_KEY]?.toString();

        if(!key) {
            return res.status(403).json({
                message: 'Forbiden error'
            })
        }

        const objKey = await findById(key);

        if(!objKey) {
            return res.status(403).json({
                message: 'Forbiden error'
            })
        }

        req.objKey = objKey;
        next();
    }catch (error) {
        console.log(error)
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if(!req.objKey.permission){
            return res.status(403).json({
                message: 'Permission denined'
            })
        }

        const isValidatePermission = req.objKey.permission.includes(permission);
        if(!isValidatePermission){
            return res.status(403).json({
                message: 'Permission denined'
            })
        }
        next();
    }
}

module.exports = {
    apiKey,
    permission
}