// auth.js
import express from 'express';
import { login, signup } from '../controller/auth.js';
import { loginValidationRules, signupValidationRules } from '../validation/authValidation.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/sendEmail.js';
import otpGenerator from 'otp-generator'


const router = express.Router();

router.post('/signup', signupValidationRules, validate, signup);
router.post('/login', loginValidationRules, validate, login);

// router.post('/forgot-password', async (req, res) => {
//     try {
//         const { email } = req.body;

//         const user = await User.findOne({ where: { email } });
//         if (!user) return res.status(404).json({ msg: "User Not Found" });

//         const resetToken = crypto.randomBytes(32).toString("hex");

//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

//         await user.save();

//         const resetUrl = `https://jsonplaceholder.typicode.com/posts`;
//         await sendEmail(user.email, "Password Reset Request", `Click here: ${resetUrl}`);

//         res.json({ message: "Reset link sent to email" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// router.post("/reset-password", async (req, res) => {
//     try {
//         const { token, newPassword } = req.body;

//         const user = await User.findOne({
//             where: {
//                 resetPasswordToken: token,
//                 resetPasswordExpires: { [Op.gt]: new Date() }
//             }
//         });

//         if (!user) return res.status(400).json({ message: "Invalid or expired token" });

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         user.resetPasswordToken = null;
//         user.resetPasswordExpires = null;

//         await user.save();

//         res.json({ message: "Password reset successful, please log in" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });



router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ msg: "Email Required" });

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ msg: "User Not Found" });

        // Generate OTP
        const resetOTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

        // Set OTP expiry time (5 minutes from now)
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        // Save OTP in the database
        await user.update({ otp: resetOTP, otpExpiry });

        // Send OTP to user email
        await sendEmail(user.email, "Password Reset OTP", resetOTP);

        res.status(200).json({ msg: "OTP sent to email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




router.post("/reset-password", async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ msg: "User Not Found" });

        // Check if OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // Check if OTP is expired
        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ error: "OTP Expired" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password and clear OTP fields
        await user.update({ password: hashedPassword, otp: null, otpExpiry: null });

        res.status(200).json({ msg: "Password Reset Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;