const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is my resolve data');
    }, 1500);

});

//console.log('berfoe');

promise.then((data) => {
    console.log(data);
});

//console.log('alter');