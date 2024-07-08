const urlApi = "http://www.omdbapi.com/?apikey=b3236382&s=avenger";

// Fitur Searching Film
const inputKeyword = document.querySelector(".input-keyword");
const searchButton = document.querySelector(".search-button");

function cetakDataFilm(jenisCetak, dataFilm) {
  if (jenisCetak === "cetakFilm") {
    return `
      <div class="col-md-4 my-3">
        <div class="card" style="width: 18rem">
          <img src="${dataFilm.Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${dataFilm.Title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${dataFilm.Year}</h6>
              <a href="#" class="btn btn-primary modalDetailButton" data-bs-toggle="modal"
      data-bs-target="#movieDetailModal" data-imdbId="${dataFilm.imdbID}">Show Details</a>
            </div>
        </div>
      </div>
    `;
  } else if (jenisCetak === "cetakDetailFilm") {
    return `
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <img src="${dataFilm.Poster}" alt="Gambar Film" class="img-fluid" />
          </div>
          <div class="col-md">
            <ul class="list-group">
              <li class="list-group-item"><h4>${dataFilm.Title}</h4></li>
              <li class="list-group-item"><strong>Director : </strong> ${dataFilm.Director}</li>

              <li class="list-group-item"><strong>Actor: </strong>${dataFilm.Actors}</li>

              <li class="list-group-item"><strong>Writer: </strong>${dataFilm.Writer}</li>

              <li class="list-group-item"><strong>Plot: </strong><br>${dataFilm.Plot}</li>
            </ul>
          </div>
        </div>
     </div>`;
  }
}

searchButton.addEventListener("click", async function (e) {
  const valueInputKeyword =
    "http://www.omdbapi.com/?apikey=b3236382&s=" + inputKeyword.value;
  const movies = await getMovies(valueInputKeyword);
  updateUi(movies);
});

function getMovies(valueInputKeyword) {
  return fetch(valueInputKeyword)
    .then((responsens) => responsens.json())
    .then((response) => response.Search);
}

function updateUi(movies) {
  let card = "";
  movies.forEach((e) => {
    card += cetakDataFilm("cetakFilm", e);
  });
  document.querySelector(".container .cards").innerHTML = card;
}

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modalDetailButton")) {
    const imdbID = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbID);
    console.log(imdbID);
    updateUiDetail(movieDetail);
  }
});

function getMovieDetail(imdbID) {
  return fetch("http://www.omdbapi.com/?apikey=b3236382&i=" + imdbID)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUiDetail(m) {
  const movieDetail = cetakDataFilm("cetakDetailFilm", m);
  document.querySelector(".modal-body").innerHTML = movieDetail;
}
