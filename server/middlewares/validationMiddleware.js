// validationMiddleware.js
import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);  // Check for any validation errors

    if (!errors.isEmpty()) {
        // If there are validation errors, return them as a response
        return res.status(400).json({ errors: errors.array() });
    }

    next();  // If no errors, proceed to the next middleware or route handler
};
