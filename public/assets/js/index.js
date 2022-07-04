const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const exploreForm = $("#explore-form");

const renderError = (id, message) => {
  const errorDiv = $(`#${id}`);
  errorDiv.empty();
  errorDiv.append(`<div class="mb-3 text-center text-danger error-text">
    ${message}
  </div>`);
};

const renderSongs = (songs) => {
  const songsContainer = $("#songs-container");

  songsContainer.empty();

  const songCards = songs
    .map((song) => {
      return `<div class="card song-card">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="${song.coverImageUrl}"
            class="img-fluid rounded-start"
            alt="${song.songAlbum}"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              ${song.songTitle}
            </h5>
            <h6>${song.songAlbum}</h6>
            <p class="card-text">${song.songArtists}</p>
            <p class="card-text"><small>${song.songDuration}</small></p>
            <p class="card-text">
              <small class="text-muted"><a
                  href="${song.albumShareLink}"
                  target="_blank"
                  class="share-link"
                ><i class="fa-brands fa-spotify me-2"></i>Open on Spotify</a></small>
            </p>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");

  songsContainer.append(songCards);
};

const handleSignup = async (event) => {
  event.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const profileImageUrl = $("#profileImageUrl").val();

  if (
    email &&
    password &&
    confirmPassword &&
    firstName &&
    lastName &&
    profileImageUrl
  ) {
    if (password === confirmPassword) {
      try {
        const payload = {
          email,
          password,
          firstName,
          lastName,
          profileImageUrl,
        };

        const response = await fetch("/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          window.location.assign("/login");
        } else {
          renderError("signup-error", "Failed to create account. Try again.");
        }
      } catch (error) {
        renderError("signup-error", "Failed to create account. Try again.");
      }
    } else {
      renderError("signup-error", "Passwords do not match. Try again.");
    }
  } else {
    renderError("signup-error", "Please complete all required fields.");
  }
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();

  if (email && password) {
    try {
      const payload = {
        email,
        password,
      };

      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/dashboard");
      } else {
        renderError("login-error", "Failed to login. Try again.");
      }
    } catch (error) {
      renderError("login-error", "Failed to login. Try again.");
    }
  } else {
    renderError("login-error", "Please complete all required fields.");
  }
};

const handleExplore = async (event) => {
  event.preventDefault();

  const query = $("#query").val();

  if (query) {
    try {
      const payload = {
        query,
      };

      const response = await fetch("/api/explore", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        $("#explore-error").empty();
        // render song cards
        const songs = data.data;
        renderSongs(songs);
      } else {
        renderError("explore-error", "Failed to retrieve results. Try again.");
      }
    } catch (error) {
      renderError("explore-error", "Failed to retrieve results. Try again.");
    }
  } else {
    renderError("explore-error", "Please enter a query.");
  }
};

signupForm.submit(handleSignup);
loginForm.submit(handleLogin);
exploreForm.submit(handleExplore);
