// Converts the output of an awaited promise to
// either [null, data] on success or
// [err] if an error is thrown.

// This allows a developer to not have to clutter up
// his/her code with try/catches

/*
	// Example:
 	async someFunction() {
		var [err, data] = await to(someAsyncMethod())
		if(err) console.log(err); return;
		else doSomethingWith(data)
	}
*/

function to(promise) {
	return promise.then(data => [null, data]).catch(err => [err])
}

module.exports = to
