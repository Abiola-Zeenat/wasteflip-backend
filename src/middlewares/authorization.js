const CustomError = require('../errors');
const {generateRefreshToken} = require('../lib/constant/jwt');


const authenticateUser = async (req, res, next) => {
    let token; 
    // Check for header
    const authHeader = req.header.authorization; 
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split('' )[1];
    }
    // Check for cookies 
    else if (req.cookies.token){
        token = req.cookies.token;
    }

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
    try {
        const payload = generateRefreshToken(token);

        //Attach the user and his permissions to the req object.
        req.user = {userId: payload.user.userId,
            role: payload.user.role
        };

        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
};


const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthenticatedError('Unauthorized to access this route');
        }
        next();
    };
};

module.exports = {authenticateUser, authorizeRoles};