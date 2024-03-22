
// middleware/rol.js

const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const userRoles = user.role; // This should be an array according to the token data
        const hasRole = userRoles.some(role => roles.includes(role)); // Check if user has any of the required roles
        if (!hasRole) {
            handleHttpError(res, "NOT_ALLOWED", 403);
            return;
        }
        next();
    } catch (err) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403);
    }
};

module.exports = checkRol;

