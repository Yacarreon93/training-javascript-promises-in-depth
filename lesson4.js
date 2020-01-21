const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");

function getMovieTitles(films) {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}: ${film.title}`)
    .join("\n");
}

fetch(API_URL + "movies")
  .then(response => {
    if (!response.ok) {
      /*
        It's also possible to throw and error returning a rejected promise,
        it's recommended to use an Error object as param to see the stack trace (helpful for debugging).
      */
      return Promise.reject(new Error("unsuccessful response"));
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
