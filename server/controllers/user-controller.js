const { User } = require("../model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

module.exports = {
  // ...

  

  /**================ GET ONE USER ==================== */
  async getUser({ params }, res) {
    try {
      const { usernameorid } = params;
      // Check if usernameoruserid is a valid ObjectId
      const isValidObjectId = mongoose.isValidObjectId(usernameorid);
  
      let user;
      if (isValidObjectId) {
        // Find user by id
        user = await User.findById(usernameorid);
      } else {
        // Find user by username
        user = await User.findOne({ username: usernameorid });
      }
  
      // Hide user's password from the frontend
      user.password = undefined;
  
      res.setHeader('Content-Type', 'application/json'); // Set content type explicitly
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  /**================ GET User Followers ==================== */
  async getUserFollowers({ params }, res) {
    try {
      const { userId:usernameorid } = params;

      const isValidObjectId = mongoose.isValidObjectId(usernameorid);

      let user;
      if (isValidObjectId) {
        // Find user by id
        user = await User.findById(usernameorid);
      } else {
        // Find user by username
        user = await User.findOne({ username: usernameorid });
      }
      const followers = await User.find({
        _id: { $in: user.followers },
      }).limit(5);

      const formattedFollowers = followers.map(
        ({ _id, username, email, occupation, location, profilePhotoUrl }) => {
          return {
            _id,
            username,
            email,
            occupation,
            location,
            profilePhotoUrl,
          };
        }
      );

      res.status(200).json(formattedFollowers);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  /**================ GET User Followings ==================== */
  async getUserFollowings({ params }, res) {
    try {
      const { userId:usernameorid } = params;
      const isValidObjectId = mongoose.isValidObjectId(usernameorid);

      let user;
      if (isValidObjectId) {
        // Find user by id
        user = await User.findById(usernameorid);
      } else {
        // Find user by username
        user = await User.findOne({ username: usernameorid });
      }

      // To find the latest 5 followers
      const followings = await User.find({
        _id: { $in: user.followings },
      });


      const formattedFollowings = followings.map(
        ({ _id, username, email, occupation, location, profilePhotoUrl }) => {
          return {
            _id,
            username,
            email,
            occupation,
            location,
            profilePhotoUrl,
          };
        }
      );

      res.status(200).json(formattedFollowings);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  async updateUserProfile({ body, files }, res) {
    try {
      const { username, location, email, occupation } = body;

      User.findOne({ username }, async (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        if (!user) {
          return res.status(401).json({ error: 'User not found' })
        }
        const fileArr = files.map((obj) => ({ url: obj["path"], filename: obj["filename"] })) || undefined;

        user.profilePhotoUrl = fileArr
        user.location = location
        user.email = email
        user.occupation = occupation

        await user.save()
        console.log('User updated successfully');
      })

      let user = await User.findOne({ username })
      res.status(200).json(user);

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error !' })
    }

  },

  /**================ Update current user password ==================== */
  async updateUserPassword(req, res) {
    try {
      const { params, body } = req;
      const username = params.userId
      const { currentPassword, newPassword } = body;

      User.findOne({ username }, async (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
      
        try {
          const isCorrectPassword = await user.isCorrectPassword(currentPassword);
      
          if (!isCorrectPassword) {
            console.log("Invalid current password");
            return res.status(401).json({ error: 'Invalid current password' });
          }
      
          user.password = newPassword;
          await user.save();
          console.log('Password updated successfully');
          return res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      })
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  /**================ to follow and Unfollow ==================== */
  async addRemoveFollow(req, res) {
    try {
      const { params, body } = req;

      if (params.userId === body.followingId) {
        return res.status(400).json({ message: "A user cannot follow themselves" });
      }
  
      const user = await User.findById(params.userId);
  
      if (!user) {
        return res.status(404).json({ message: "Couldn't find the user" });
      }
  
      const following = await User.findById(body.followingId);
  
      if (!following) {
        return res
          .status(404)
          .json({ message: "Couldn't find the user you're trying to follow" });
      }
  
      const followingIndex = user.followings.indexOf(body.followingId);
  
      if (followingIndex !== -1) {
        user.followings.splice(followingIndex, 1);
        await User.findByIdAndUpdate(body.followingId, {
          $pull: { followers: user._id },
        });
      } else {
        user.followings.push(body.followingId);
        await User.findByIdAndUpdate(body.followingId, {
          $push: { followers: user._id },
        });
      }
  
      await user.save();
  
      const followings = await User.find({ _id: { $in: user.followings } });
  
      const formattedFollowings = followings.map(
        ({ _id, username, email, occupation, location, profilePhotoUrl }) => {
          return { _id, username, email, occupation, location, profilePhotoUrl };
        }
      );
  
      res.json(formattedFollowings);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  ,

  /**================ searchUser ==================== */
  async getUsers({ query }, res) {
    try {
      const searchInput = query.searchInput;
      const searchRegex = new RegExp(
        `^${searchInput}$|^${searchInput}|${searchInput}$|${searchInput}`,
        "i"
      );
      const users = await User.find({ username: searchRegex })
        .select("username occupation profilePhotoUrl")
        .limit(5)
        .lean()
        .exec();

      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({ message: "No users found with the specified search term." });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
