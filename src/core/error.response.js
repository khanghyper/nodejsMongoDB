'use strict'

// const statusCode = {
//     FORBIDEN: 403,
//     CONFILICT: 409
// }
//
// const ReasonStatusCode = {
//     FORBIDEN: 'Forbiden error!',
//     CONFILICT: 'Conflict error!'
// }
//
// class ErrorResponse extends Error {
//
//     constructor(message, statusCode) {
//         super(message);
//         this.statusCode = statusCode;
//     }
// }
//
// class ConflictRequestError extends ErrorResponse {
//     constructor(message = ReasonStatusCode.CONFILICT, statusCode = statusCode.CONFILICT) {
//         super(message, statusCode);
//     }
// }
//
// class ForbidenRequestError extends ErrorResponse {
//     constructor(message = ReasonStatusCode.FORBIDEN, statusCode = statusCode.FORBIDEN) {
//         super(message, statusCode);
//     }
// }
//
// module.exports = {
//     ConflictRequestError,
//     ForbidenRequestError
// }

class ApiError extends Error {
    constructor(statusCode, message) {
        // Gọi tới hàm khởi tạo của class Error (class cha) để còn dùng this (kiến thức OOP lập trình hướng đối tượng căn bản)
        // Thằng cha (Error) có property message rồi nên gọi nó luôn trong super cho gọn
        super(message)

        // Tên của cái custom Error này, nếu không set thì mặc định nó sẽ kế thừa là "Error"
        this.name = 'ApiError'

        // Gán thêm http status code của chúng ta ở đây
        this.statusCode = statusCode

        // Ghi lại Stack Trace (dấu vết ngăn xếp) để thuận tiện cho việc debug
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ApiError;