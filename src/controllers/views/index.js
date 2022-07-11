const path = require("path");

const { Playlist, User, PlaylistSong } = require("../../models");

const renderHomePage = async (req, res) => {
  const playlistsFromDb = await Playlist.findAll({
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },
      {
        model: PlaylistSong,
        as: "songs",
      },
    ],
    attributes: ["id", "title", "imageUrl", "createdAt"],
  });

  const playlists = playlistsFromDb.map((playlist) => {
    return playlist.get({ plain: true });
  });

  return res.render("home", {
    isLoggedIn: req.session.isLoggedIn,
    currentPage: "home",
    playlists,
  });
};

const renderLoginPage = (req, res) => {
  return res.render("login", { currentPage: "login" });
};

const renderSignupPage = (req, res) => {
  return res.render("signup", { currentPage: "signup" });
};

const renderDashboardPage = async (req, res) => {
  const playlistsFromDb = await Playlist.findAll({
    where: {
      userId: req.session.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },
      {
        model: PlaylistSong,
        as: "songs",
      },
    ],
    attributes: ["id", "title", "imageUrl", "createdAt"],
  });

  const playlists = playlistsFromDb.map((playlist) => {
    return playlist.get({ plain: true });
  });

  return res.render("dashboard", { currentPage: "dashboard", playlists });
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
