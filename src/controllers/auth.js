const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { generateRefreshToken } = require('../lib/constant/jwt'); 

// Register user
const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }

    // First registered user is an admin
    const firstAccount = (await User.countDocuments({})) === 0;
    const role = firstAccount ? 'admin' : 'user';

    const user = await User.create({ fullName, email, password, role });
    const userToken = generateRefreshToken(user);

    // Set access token in cookie
    res.cookie('accessToken', userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 15, // 15 minutes
    });

  res.status(StatusCodes.CREATED).json({
    status: 201,
    message: 'User created successfully',
    user: userToken });
};

// Login user
const login = async (req, res) => {
    try{
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid email');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid password');
    }

    const userToken = generateRefreshToken(user);

    // Set access token in cookie
    res.cookie('accessToken', userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 15, // 15 minutes
    });

    res.status(StatusCodes.OK).json({
        status: 200,
        message: 'User logged in successfully',
        user: userToken }); 
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    };
};  

// Logout user
const logout = async (req, res) => {
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + 1000), // Expire immediately
    });

    res.status(StatusCodes.OK).json({ message: 'User logged out' });
};

module.exports = { register, login, logout };
