const API_URL = "https://starwars.egghead.training/";
const WRONG_API_URL = "https://star-wars.egghead.training/";

const responsePromise = fetch(WRONG_API_URL + "films");
const responsePromise2 = fetch(API_URL + "films");

const output = document.getElementById("output");
const output2 = document.getElementById("output2");

output.innerText = "Loading...";

// console.log('fetch(API_URL + "films")', responsePromise);

function getMovieTitles(films) {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}: ${film.title}`)
    .join("\n");
}

responsePromise.then(
  response => {
    console.log("response >", response);
    const json = response.json();
    console.log("response.json() >", json);
    return json.then(films => {
      console.log("films >", films);
      const movieTitles = getMovieTitles(films);
      console.log("getMovieTitles() >", movieTitles);
      output.innerText = movieTitles;
    });
  },
  error => {
    console.warn(error);
    output.innerText = ":(";
  }
);
//   .then(films => {
//     console.log("films >", films);
//     const movieTitles = getMovieTitles(films);
//     console.log("getMovieTitles() >", movieTitles);
//     output.innerText = movieTitles;
//   });

responsePromise2.then(
  response => {
    return Promise.reject("Invalid JSON").then(
      films => {
        output2.innerText = getMovieTitles(films);
      },
      error => {
        console.warn(error);
        output2.innerText = ":(";
      }
    );
  },
  error => {
    console.warn(error);
    output.innerText = ":(";
  }
);

responsePromise2
  .then(response => {
    return Promise.reject("Invalid JSON 2").then(films => {
      output2.innerText = getMovieTitles(films);
    });
  })
  .then(undefined, error => {
    console.warn(error);
    output.innerText = ":(";
  });

responsePromise2
  .then(response => {
    return Promise.reject("Invalid JSON 3").then(films => {
      output2.innerText = getMovieTitles(films);
    });
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  });

fetch(API_URL + "movies") // Even if the endpoint doesn't exist (404) the promise will be fullfilled
  .then(response => {
    if (!response.ok) {
      throw new Error("unsuccessful response");
    }

    return response.json().then(films => {
      output2.innerText = getMovieTitles(films);
    });
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  });
