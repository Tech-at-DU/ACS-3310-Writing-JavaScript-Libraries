
// A humble String
const str = 'hello world'

// Strings have a lot in common with Arrays
console.log(str[1]) // 'e'
console.log(str.length) // 11
console.log(str.slice(3)) // `lo world`
console.log(str.split('')) // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']

// Here's an array method that will helpful
// Use join() to join an array of strings into a single string
console.log(['foo', 'bar'].join()) // 'foo,bar' <- Notice the ,
console.log(['foo', 'bar'].join(' ')) // 'foo bar' <- notice we added a seprator ' '

console.log('--- upperFirst ---')
// The function below needs to uppercase the 
// first letter of the input string
function upperFirst(str) {
  // Get first letter of str
	// convert to uppercase 
	// combine the uppercased first letter with the rest of the str
}

console.log(upperFirst('foo'))

console.log('--- upperFirstWord ---')
// The function below needs to upper case the first 
// letter of each word in the input string
function upperWords(str) {
  // Split the string on the space ' ' (should return an array)
	// Loop over each string in the array
		// upper case the first letter of each str
	// Join your array of strings with a space and return it
}

console.log(upperWords('hello foo bar world!'))

console.log('--- camelcase ---')
// Conver string to camel case.
// hello world -> helloWorld
function camelCase(str) {
  // Split str into array of words (assume you can split on a space)
	// loop over all of the words
		// The first word should be lower case 
		// The other words should begin with an uppercase letter
	// Join your array with '' (empty string) and return it 
}


console.log('--- kebabCase ---')
// Conver string to kebab case.
// hello world -> hello-world
function kebabCase(str, sep = '-') {
  // Split the str on the space. 
	// join the array of string with the separator
	// return your joined string
}

console.log(kebabCase('hello world foo bar'))


console.log('--- snakeCase ---')
// Convert string to snake case.
// hello world -> hello_world
function snakeCase(str) {
  // Call the kebabCase function with str and '_' as the separator
	// return the results 
}