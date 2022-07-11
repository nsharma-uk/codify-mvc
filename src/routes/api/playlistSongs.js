const { Router } = require("express");

const { addSongToPlaylist } = require("../../controllers/api/playlistSongs");

const router = Router({ mergeParams: true });

router.post("/", addSongToPlaylist);

module.exports = router;
