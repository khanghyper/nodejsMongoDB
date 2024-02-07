'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201
}

const ReasonStatusCode = {
    CREATED: 'Created!',
    OK: 'Success!'
}
class SuccessResponse {
    constructor({message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, data = {}}) {
        this.message = !message ? reasonStatusCode: message;
        this.statusCode = statusCode;
        this.data = data;
    }

    send(res, headers = {}) {
        return res.status(this.statusCode).json(this)
    }
}