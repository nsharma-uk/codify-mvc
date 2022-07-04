const { Router } = require("express");

const playlists = require("./playlists");
const dashboard = require("./dashboard");
const explore = require("./explore");

const router = Router();

router.use("/playlists", playlists);
router.use("/dashboard", dashboard);
router.use("/explore", explore);

module.exports = router;
