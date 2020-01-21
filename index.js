const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");

const output = document.getElementById("output");

output.innerText = "Loading...";

console.log('fetch(API_URL + "films")', responsePromise);

function getMovieTitles(films) {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}: ${film.title}`)
    .join("\n");
}

responsePromise
  .then(response => {
    console.log("response >", response);

    const json = response.json();

    console.log("response.json() >", json);

    return json;
  })
  .then(films => {
    console.log("films >", films);

    const movieTitles = getMovieTitles(films);

    console.log("getMovieTitles() >", movieTitles);

    output.innerText = movieTitles;
  });
