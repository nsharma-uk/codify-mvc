const User = require("./User");
const Playlist = require("./Playlist");
const PlaylistSong = require("./PlaylistSong");

User.hasMany(Playlist, {
  foreignKey: "userId",
});

Playlist.belongsTo(User, {
  foreignKey: "userId",
});

PlaylistSong.belongsTo(Playlist, {
  foreignKey: "playlistId",
});

Playlist.hasMany(PlaylistSong, {
  foreignKey: "playlistId",
  as: "songs",
});

module.exports = { User, Playlist, PlaylistSong };
