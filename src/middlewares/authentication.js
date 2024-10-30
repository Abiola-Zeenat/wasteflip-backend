const CustomError = require('../errors');
const {generateRefreshToken} = require('../lib/constant/jwt');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    try{
        const {name, userId, role} = generateRefreshToken({token});
        req.user = {name, userId, role};
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
};


const authorizePermissions = (...roles) => {
    return (req , res, next) => {
        if(!roles.includes(req.user.role)) {
           throw new CustomError.UnauthenticatedError('Unauthorized to access this route'); 
        }
        next();    
    };
};

module.exports = {
    authenticateUser,
    authorizePermissions
};