const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");

function getMovieTitles(films) {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}: ${film.title}`)
    .join("\n");
}

fetch(API_URL + "films")
  .then(response => {
    if (!response.ok) {
      throw new Error("unsuccessful response");
    }

    return response.json().then(films => {
      output.innerText = getMovieTitles(films);
    });
  })
  .catch(error => {
    console.warn(error);

    output.innerText = ":(";
  })
  .finally(() => {
    document.getElementById("loading").remove();
  });
