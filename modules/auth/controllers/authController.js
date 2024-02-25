const { generateResponse, generateInternalServerError } = require('../../../libraries/responseLibrary');
const {generateToken} = require('../../../utils/jwtUtil');
const { hashPassword, comparePassword } = require('../../../utils/passwordHash');
const { encryptId, decryptId } = require('../../../libraries/encryption')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const signup = async (req, res) => {
    try {
        // Extract user data from request body
        const { name, password, phone, email } = req.body;

        // Validate input fields
        if (!name || !password || !phone || !email) {
            return res.status(400).json(generateResponse(400, "All fields are required"));
        }

        // Use hash password
        const hashedPassword = await hashPassword(password);

        // Create user in database
        const newUser = await prisma.user.create({
            data: {
                name,
                password: hashedPassword,
                phone,
                email,
            },
        });


     // Generate encrypted user ID
     const encryptedUserId = encryptId(newUser.id);

     // Generate JWT token
     const token = generateToken({ id: encryptedUserId });

     // Return success response with JWT token
     return res.status(201).json(generateResponse(201, "User created successfully", { name:newUser.name, phone:newUser.phone, email:newUser.email, token }));

    } catch (error) {
        if (error.code == 'P2002') {
            return res.status(401).json(generateResponse(401, "Email already exist"));
        }
        return res.status(500).json(generateResponse(500, "Internal server error"));
    }
};


const login = async (req, res) => {
    try {
        // Extract username and password from request body
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json(generateResponse(400, "Email and password are required"));
        }

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });

        // Check if user exists and password matches
        if (!user || !(await comparePassword(password, user.password))) {
            // Failed login
            return res.status(401).json(generateResponse(401, "Invalid email or password"));
        }

        // Decrypt user ID
        const decryptedUserId = encryptId(user.id);

        // Generate JWT token
        const token = generateToken({ id: decryptedUserId });

        // Successful login
        return res.status(200).json(generateResponse(200, "Login successful", { name:user.name,phone:user.phone, email:user.email , token }));
    } catch (error) {
        return res.status(500).json(generateResponse(500, "Internal server error"));
    }
};

const userDetail = async (req, res) => {
    try {
       
     // Return success response with JWT token
     return res.status(201).json(generateResponse(201, "User details displaied successfully", { user: req.user }));

    } catch (error) {
        return res.status(500).json(generateResponse(500, "Internal server error"));
    }
};


module.exports = {
    login,
    signup,
    userDetail
};