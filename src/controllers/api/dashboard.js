const { Playlist } = require("../../models");

const getDashboard = async (req, res) => {
  try {
    // FOR NOW: hard code user id
    // Later, get user id from logged in session object
    const userId = 1;

    const data = await Playlist.findAll({ where: { id: userId } });

    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all playlists | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

module.exports = {
  getDashboard,
};
