const { PlaylistSong } = require("../../models");

const addSongToPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;

    console.log(playlistId);

    console.log(req.body);

    const {
      albumShareLink,
      coverImageUrl,
      songAlbum,
      songArtists,
      songDuration,
      songId,
      songTitle,
    } = req.body;

    const userId = req.session.user.id;

    await PlaylistSong.create({
      playlistId,
      albumShareLink,
      coverImageUrl,
      songAlbum,
      songArtists,
      songDuration,
      songId,
      songTitle,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to add song to playlist | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

module.exports = {
  addSongToPlaylist,
};
