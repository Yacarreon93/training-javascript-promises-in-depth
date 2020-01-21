const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");

function getMovieTitles(films) {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}: ${film.title}`)
    .join("\n");
}

const fulfilledPromise = Promise.resolve(42); // Returns a promise that was immediately fullfilled with the value.

console.log("fulfilledPromise", fulfilledPromise);

console.log(Promise.resolve(fulfilledPromise) === fulfilledPromise); // Calling Promise.resolve with a native promise as arg will return the exact same object

const rejectedPromise = Promise.reject(new Error(":("));

console.log("rejectedPromise", rejectedPromise);

console.log(Promise.resolve(rejectedPromise) === rejectedPromise); // If use a rejectetPromise as arg it will return the same rejected promise

console.log("fulfilledPromise with error", Promise.resolve(new Error(":("))); // However, if you call Promise.resolve with an error, a fulfilled promise will be returned anyway

/*
  When using third party tools (eg. $) that don't support native Promises,
  it's possible to use Promise.resolve to get access to all methods of the native Promises.
  This works for all non-standard promise objects with a then() method (aka. thenables).
*/
Promise.resolve($.getJSON(API_URL + "films"))
  .then(films => {
    output.innerText = getMovieTitles(films);
  })
  .catch(error => {
    console.warn(error);

    output.innerText = ":(";
  })
  .finally(() => {
    document.getElementById("loading").remove();
  });
