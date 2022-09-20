/*

	%d - integers
	%s - strings
	%f - floating point number
	%t - boolean
	%T - prints the type of the variable given
	%v - prints any object of any type

*/

package main

import "fmt"

func main() {

	// fmt.Println() usage
	fmt.Println("Hello")

	// multiple arguments of different types can be given separated by commas
	fmt.Println("Hello", 22, 98.3, true)

	// you can also pass variables as arguments
	a := "Hello"
	b := "World"

	fmt.Println(a, b)

	// fmt.Printf() usage
	fmt.Printf("%s is %d years old.", "Jon Snow", 30)

	// using %v for printing everything
	fmt.Printf("%v is %v years old.", "Jon Snow", 30)

	// let's try printing type of any variable
	name := "Jon Snow"
	fmt.Printf("%T is the type of %v", name, name)

	// fmt.Sprintf() usage
	// the function returns a formatted string.
	s := fmt.Sprintf("%s is the son of %s", "Harry", "Lily") // returns a string "Harry is the son of Lily"

	// let's print the string s
	fmt.Println(s)
}
