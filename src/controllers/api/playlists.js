const getAllPlaylists = (req, res) => {
  return res.json({ success: true, data: [] });
};

const getSinglePlaylist = (req, res) => {
  return res.json({ success: true, data: {} });
};

const createPlaylist = (req, res) => {
  return res.json({ success: true });
};

module.exports = {
  getAllPlaylists,
  getSinglePlaylist,
  createPlaylist,
};
