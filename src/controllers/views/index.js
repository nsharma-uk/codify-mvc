const path = require("path");

const renderHomePage = (req, res) => {
  return res.render("home", {
    isLoggedIn: req.session.isLoggedIn,
    currentPage: "home",
  });
};

const renderLoginPage = (req, res) => {
  return res.render("login", { currentPage: "login" });
};

const renderSignupPage = (req, res) => {
  return res.render("signup", { currentPage: "signup" });
};

const renderDashboardPage = (req, res) => {
  return res.render("dashboard", { currentPage: "dashboard" });
};

const renderCreatePlaylistPage = (req, res) => {
  return res.render("createPlaylist");
};

const renderPlaylistPage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/singlePlaylist.html");
  return res.sendFile(filePath);
};

const renderExplorePage = (req, res) => {
  return res.render("explore");
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderDashboardPage,
  renderCreatePlaylistPage,
  renderPlaylistPage,
  renderExplorePage,
};
