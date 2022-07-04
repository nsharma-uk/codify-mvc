const { Playlist } = require("../../models");

const getAllPlaylists = async (req, res) => {
  try {
    const data = await Playlist.findAll({});

    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all playlists | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const getSinglePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Playlist.findByPk(id);

    if (!data) {
      return res.status(404).json({ success: false });
    }

    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all playlists | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // FOR NOW: hard code user id
    // Later, get user id from logged in session object
    const userId = 1;

    await Playlist.create({
      title,
      imageUrl,
      userId,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to create playlist | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

module.exports = {
  getAllPlaylists,
  getSinglePlaylist,
  createPlaylist,
};
