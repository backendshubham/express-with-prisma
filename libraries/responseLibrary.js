// libraries/responseLibrary.js

// Library function to generate response object
const generateResponse = (statusCode, message, data = null) => {
    return {
        status: statusCode >= 200 && statusCode < 300 ? "success" : "error",
        statusCode: statusCode,
        message: message,
        data: data,
    };
};

// Library function to generate internal server error response
const generateInternalServerError = () => {
    return {
        status: "error",
        statusCode: 500,
        message: "Internal server error",
        data: null,
    };
};

module.exports = {
    generateResponse,
    generateInternalServerError,
};
