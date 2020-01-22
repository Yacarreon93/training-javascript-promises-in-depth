const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

promise.then(
  () => {
    console.log("fulfilled");
  },
  () => {
    console.log("rejected");
  }
);

let accum = 0;

console.log("right away");

const sleep = ms =>
  new Promise((resolve, reject) => {
    accum += ms;

    if (accum <= 5000) {
      return setTimeout(() => {
        resolve();
      }, ms);
    }

    reject(new Error("you have slept enough"));
  });

sleep(1000)
  .then(() => {
    console.log("after 1 s");
    return sleep(2000);
  })
  .then(() => console.log("after 3s"))
  .then(() => sleep(2000))
  .then(() => console.log("after 5s"))
  .then(() => sleep(2000))
  .catch(error => console.warn(error));
