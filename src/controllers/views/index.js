const path = require("path");

const renderHomePage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/publicHome.html");
  return res.sendFile(filePath);
};

const renderLoginPage = (req, res) => {
  return res.render("login", { currentPage: "login" });
};

const renderSignupPage = (req, res) => {
  return res.render("signup", { currentPage: "signup" });
};

const renderDashboardPage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/dashboard.html");
  return res.sendFile(filePath);
};

const renderCreatePlaylistPage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/createPlaylist.html");
  return res.sendFile(filePath);
};

const renderPlaylistPage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/singlePlaylist.html");
  return res.sendFile(filePath);
};

const renderExplorePage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/explore.html");
  return res.sendFile(filePath);
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
