import jwt from 'jsonwebtoken'; // Import jwt for token verification

// Middleware to verify JWT token and protect routes
export const verifyUser = (req, res, next) => {
    const token = req.header('auth-token'); // Get the token from request header
    if (!token) {
        // If no token is provided, send an access denied response
        return res.status(401).json({ status: '401', msg: 'Access Denied' });
    }

    try {
        // Verify the token using the secret key
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user; // Attach the decoded user information to the request object
        next(); // Call next to proceed to the next middleware/route handler
    } catch (error) {
        // If token verification fails, send an error response
        res.status(400).json({ status: '400', msg: 'Invalid Token' });
    }
};
