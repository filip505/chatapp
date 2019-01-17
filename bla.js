let promise = new Promise(function (resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done!"
  setTimeout(() => resolve("done!"), 1000);
});

const t = async() => {
  const res2 = await promise
  console.log(res2) 
}

promise.then((t) => { console.log(t) })

// async function f() {

//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("done!"), 1000)
//   });

//   let result = await promise; // wait till the promise resolves (*)

//   console.log(result); // "done!"
// }

// f();