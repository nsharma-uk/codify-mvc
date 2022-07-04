const { User } = require("../../models");

const login = async (req, res) => {
  try {
    // get the user data from payload
    const { email, password } = req.body;

    // get user by email address
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(
        `[ERROR]: Failed to login | No user found with email: ${email}`
      );

      return res.status(500).json({ success: false });
    }

    const isAuthorised = await user.checkPassword(password);

    if (isAuthorised) {
      return res.json({ success: true });
    } else {
      console.log(
        `[ERROR]: Failed to login | Incorrect password for email: ${email}`
      );

      return res.status(500).json({ success: false });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const signup = async (req, res) => {
  try {
    // get the user data from payload
    const { firstName, lastName, email, password, profileImageUrl } = req.body;

    // check if user exists
    const user = await User.findOne({ where: { email } });

    if (user) {
      console.log(
        `[ERROR]: Failed to create user | Account already exists with email: ${email}`
      );

      return res.status(500).json({ success: false });
    }

    // create user
    await User.create({
      firstName,
      lastName,
      email,
      password,
      profileImageUrl,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const logout = (req, res) => {};

module.exports = {
  login,
  signup,
  logout,
};
