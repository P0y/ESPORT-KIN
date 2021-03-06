const superagent = require('superagent');

// This is isn't declared as `async` because it already returns a promise
function delay() {
    // `delay` returns a promise
    return new Promise(function(resolve, reject) {
        // Only `delay` is able to resolve or reject the promise
        setTimeout(function() {
            resolve(42); // After 3 seconds, resolve the promise with value 42
        }, 3000);
    });
}


async function getAllBooks() {
    try {
        // GET a list of book IDs of the current user
        var bookIDs = await superagent.get('/user/books');
        // wait for 3 seconds (just for the sake of this example)
        await delay();
        // GET information about each book
        return await superagent.get('/books/ids='+JSON.stringify(bookIDs));
    } catch(error) {
        // If any of the awaited promises was rejected, this catch block
        // would catch the rejection reason
        return null;
    }
}

// Start an IIFE to use `await` at the top level
(async function(){
    let books = await getAllBooks();
    console.log(books);
})();