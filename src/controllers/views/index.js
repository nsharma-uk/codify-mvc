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

const renderPlaylistPage = async (req, res) => {
  const playlistId = req.params.id;

  const playlistFromDb = await Playlist.findByPk(playlistId, {
    include: [
      {
        model: PlaylistSong,
        as: "songs",
      },
    ],
  });

  const playlist = playlistFromDb.get({ plain: true });

  return res.render("playlist", { playlist });
};

const renderExplorePage = async (req, res) => {
  const playlistsFromDb = await Playlist.findAll({
    where: { userId: req.session.user.id },
    attributes: ["id", "title"],
  });

  const playlists = playlistsFromDb.map((playlist) => {
    return playlist.get({ plain: true });
  });

  return res.render("explore", { playlists });
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
