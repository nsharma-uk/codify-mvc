const { Router } = require("express");

const {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderDashboardPage,
  renderCreatePlaylistPage,
  renderPlaylistPage,
  renderExplorePage,
} = require("../../controllers/views");

const router = Router();

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/dashboard", renderDashboardPage);
router.get("/create-playlist", renderCreatePlaylistPage);
router.get("/playlists/:id", renderPlaylistPage);
router.get("/explore", renderExplorePage);

module.exports = router;
