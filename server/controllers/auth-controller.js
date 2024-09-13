const nodemailer = require('nodemailer');
const axios = require('axios');
const crypto = require('crypto');
const { User } = require("../model");
const { signToken } = require("../middleware/jwt-config");
require("dotenv").config();

module.exports = {
  /**==========REGISTER USER============ */
  async register({ body }, res) {
    try {
      const { username, email, password, location, occupation } = body;

      // Generate a 6-digit numeric verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const verificationCodeExpires = Date.now() + 3600000; // 1 hour expiry

      const newUser = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        location: location.toLowerCase(),
        occupation: occupation.toLowerCase(),
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
        verificationCode,
        verificationCodeExpires,
        isVerified: false,
      });

      // Send verification email
      await sendVerificationEmail(newUser.email, verificationCode);

      res.status(201).json({ message: "Verification email sent. Please check your inbox." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  /**==========VERIFY USER EMAIL============ */
  async verifyEmail(req, res) {
    try {
      const { email, verificationCode } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      if (user.verificationCode !== verificationCode || user.verificationCodeExpires < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired verification code" });
      }

      user.isVerified = true;
      user.verificationCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();

      // Generate JWT token after verification
      const token = signToken(user);

      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**==========Login USER============ */
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email before logging in" });
      }

      const isValidPasword = await user.isCorrectPassword(password);

      if (!isValidPasword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      user.password = undefined;

      const token = signToken(user);

      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async verifyCaptcha(req, res) {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: "Token is missing" });
    }
  
    try {
      const secretKey = process.env.CAPTCHA_SECRET_KEY;
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
      );
  
      const { success } = response.data;
      if (success) {
        console.log("Captcha verified");
        res.json({ success: true, message: "Captcha verified" });
      } else {
        res.status(400).json({ success: false, message: "Captcha verification failed" });
      }
    } catch (error) {
      console.error("Error during captcha verification", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
};

/**==========Helper Function to Send Verification Email============ */
async function sendVerificationEmail(email, verificationCode) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.DREACA_EMAIL,
      pass: process.env.APP_PASS,
    },
  });

  let mailOptions = {
    from: process.env.DREACA_EMAIL,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h2 style="color: #00CDE1;">Dreaca Email Verification</h2>
          <p style="font-size: 16px; color: #555;">Hello,</p>
          <p style="font-size: 16px; color: #555;">
            Thank you for registering at Dreaca! To complete your registration, please verify your email address by entering the verification code below:
          </p>
        </div>
  
        <div style="text-align: center; padding: 20px; background-color: #f9f9f9; border: 1px solid #e1e1e1; border-radius: 5px;">
          <h3 style="font-size: 24px; letter-spacing: 3px; color: #333;">${verificationCode}</h3>
        </div>
  
        <div style="padding-top: 20px;">
          <p style="font-size: 16px; color: #555;">
            This code will expire in 1 hour. If you didn't request this, please ignore this email or contact our support team.
          </p>
          <p style="font-size: 16px; color: #555;">
            Best regards,<br/>
            The Dreaca Team
          </p>
        </div>
  
        <footer style="margin-top: 40px; text-align: center; font-size: 12px; color: #888;">
          <p>&copy; ${new Date().getFullYear()} Dreaca. All rights reserved.</p>
        </footer>
      </div>
    `,
  };
  

  await transporter.sendMail(mailOptions);
}
