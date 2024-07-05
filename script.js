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

getDataFilm(
  "http://www.omdbapi.com/?apikey=b3236382&s=avenger",
  (results) => {
    const dataFilm = JSON.parse(results).Search;
    let card = "";
    dataFilm.forEach((e) => {
      card += `
      <div class="col-md-4 my-3">
          <div class="card" style="width: 18rem">
            <img src="${e.Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${e.Title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${e.Year}</h6>
              <a href="#" class="btn btn-primary modalDetailButton" data-bs-toggle="modal"
      data-bs-target="#movieDetailModal" data-imdbId="${e.imdbID}">Show Details</a>
            </div>
          </div>
        </div>
      `;
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
              console.log(result.Title);
              const movieDetail = `
              <div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${result.Poster}" alt="Gambar Film" class="img-fluid" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${result.Title}</h4></li>
                    <li class="list-group-item"><strong>Director : </strong> ${result.Director}</li>
                    <li class="list-group-item"><strong>Actor: </strong>${result.Actor}</li>
                    <li class="list-group-item"><strong>Writer: </strong>${result.Writer}</li>
                    <li class="list-group-item"><strong>Plot: </strong><br>${result.Plot}</li>
                  </ul>
                </div>
              </div>
            </div>`;
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
