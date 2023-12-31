const { User } = require("../model");
const { signToken } = require("../middleware/jwt-config");

module.exports = {
  /**==========REGISTER USER============ */
  async register({ body }, res) {
    try {
      const { username, email, password, location, occupation } = body;
      const newUser = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        location: location.toLowerCase(),
        occupation: occupation.toLowerCase(),
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });

      //Delete password
      newUser.password = undefined;

      //Generate JWT
      const token = signToken(newUser);

      res.status(201).json({ token, newUser });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  /**==========Login USER============ */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log(username);

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      //password check
      const isValidPasword = await user.isCorrectPassword(password);

      //Invalid password
      if (!isValidPasword) {
        console.log("invalid password");
        return res.status(400).json({ message: "Invalid credentials" });
      }

      //Delete password
      user.password = undefined;

      const token = signToken(user);

      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
