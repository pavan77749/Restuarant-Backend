import JWT from 'jsonwebtoken';

export const requireSignIn = async (req, res, next) => {
    try {
        // Check if Authorization header exists
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access: Missing or invalid token"
            });
        }

        // Extract token from header
        const token = authHeader.split(" ")[1];

        // Verify JWT token
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized Access: Invalid token",
                    error: err.message
                });
            } else {
                // Attach decoded user ID to request object
                req.body.id = decode.id;
                next(); // Move to the next middleware or route handler
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Auth Middleware API',
            error: error.message
        });
    }
};
