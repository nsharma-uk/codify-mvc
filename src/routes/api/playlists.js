const { Router } = require("express");

const {
  getAllPlaylists,
  getSinglePlaylist,
  createPlaylist,
} = require("../../controllers/api/playlists");

const router = Router();

router.get("/", getAllPlaylists);
router.get("/:id", getSinglePlaylist);
router.post("/", createPlaylist);

module.exports = router;
