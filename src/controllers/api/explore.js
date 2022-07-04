const axios = require("axios");

const SPOTIFY_URL = "https://spotify23.p.rapidapi.com/search/";

const formatDuration = (totalMilliseconds) => {
  const seconds = Math.round(totalMilliseconds / 1000) % 60;
  const minutes = (Math.round(totalMilliseconds / 1000) - seconds) / 60;
  return `${minutes}m ${seconds}s`;
};

const formatArtists = (artists) =>
  artists.map((artist) => artist?.profile?.name).join(" | ");

const getCoverImageUrl = (sources) => {
  const source = sources.find((source) => {
    return source.width === 300 && source.height === 300;
  });

  if (source) {
    return source.url;
  }

  return "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
};

const getTracksFromResults = (items) =>
  items.map(({ data }) => ({
    songId: data?.id,
    songTitle: data?.name,
    songAlbum: data?.albumOfTrack?.name,
    songArtists: formatArtists(data?.artists?.items),
    songDuration: formatDuration(data?.duration?.totalMilliseconds),
    albumShareLink: data?.albumOfTrack?.sharingInfo?.shareUrl,
    coverImageUrl: getCoverImageUrl(data?.albumOfTrack?.coverArt?.sources),
  }));

const getTracks = async (req, res) => {
  const { query } = req.body;

  const options = {
    params: {
      q: query,
      type: "multi",
      offset: "0",
      limit: "10",
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const { data } = await axios.get(SPOTIFY_URL, options);

  const tracks = getTracksFromResults(data?.tracks?.items || []);

  return res.json({ success: true, data: tracks });
};

module.exports = {
  getTracks,
};
