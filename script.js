const urlApi = "http://www.omdbapi.com/?apikey=b3236382&s=avenger";

function getDataFilm(url, succes, error) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        succes(xhr.response);
      } else if (xhr.status === 404) {
        error();
      }
    }
  };

  xhr.open("get", url);
  xhr.send();
}

function getOmdbIDFilm(url, succes, error) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        succes(xhr.response);
      } else if (xhr.status === 404) {
        error();
      }
    }
  };

  xhr.open("get", url);
  xhr.send();
}

function searchDataFilm(url, succes, error) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        succes(xhr.response);
      } else if (xhr.status === 404) {
        error();
      }
    }
  };

  xhr.open("get", url);
  xhr.send();
}

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

getDataFilm(
  "http://www.omdbapi.com/?apikey=b3236382&s=avenger",
  (results) => {
    const dataFilm = JSON.parse(results).Search;
    let card = "";
    dataFilm.forEach((e) => {
      card += cetakDataFilm("cetakFilm", e);
      document.querySelector(".container .cards").innerHTML = card;

      const allButtonsDetailFilm =
        document.querySelectorAll(".modalDetailButton");
      allButtonsDetailFilm.forEach((e) => {
        e.addEventListener("click", (e) => {
          const imdbID = e.target.getAttribute("data-imdbId");
          getOmdbIDFilm(
            "http://www.omdbapi.com/?apikey=b3236382&i=" + imdbID,
            (results) => {
              const result = JSON.parse(results);
              const movieDetail = cetakDataFilm("cetakDetailFilm", result);
              document.querySelector(".modal-body").innerHTML = movieDetail;
            },
            () => {}
          );
        });
      });
    });
  },
  (e) => {
    console.error(e.reponseText);
  }
);

// Fitur Searching Film
const inputKeyword = document.querySelector(".input-keyword");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", (e) => {
  const valueInputKeyword =
    "http://www.omdbapi.com/?apikey=b3236382&s=" + inputKeyword.value;
  fetch(valueInputKeyword)
    .then((responsens) => responsens.json())
    .then((m) => {
      const movies = m.Search;
      let card = "";
      movies.forEach((e) => {
        card += cetakDataFilm("cetakFilm", e);
      });
      document.querySelector(".container .cards").innerHTML = card;

      // Fitur melihat detail movie
      const allButtonsDetailFilm =
        document.querySelectorAll(".modalDetailButton");
      allButtonsDetailFilm.forEach((e) => {
        e.addEventListener("click", (e) => {
          const imdbID = e.target.getAttribute("data-imdbId");
          fetch("http://www.omdbapi.com/?apikey=b3236382&i=" + imdbID)
            .then((response) => response.json())
            .then((m) => {
              const movieDetail = cetakDataFilm("cetakDetailFilm", m);
              document.querySelector(".modal-body").innerHTML = movieDetail;
            });
        });
      });
    });
});
