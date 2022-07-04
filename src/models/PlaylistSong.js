const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");
const Playlist = require("./Playlist");

class PlaylistSong extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  playlistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Playlist,
      key: "id",
    },
  },
  songId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  songTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  songAlbum: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  songArtists: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  songDuration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  albumShareLink: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  coverImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
    defaultValue:
      "https://images.unsplash.com/photo-1580656449278-e8381933522c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
  },
  previewUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  underscored: false,
  freezeTableName: true,
  modelName: "playlistSong",
};

PlaylistSong.init(schema, options);

module.exports = PlaylistSong;
