/*
	An anonymous function is a function that was declared without any named identifier to refer to it
*/
package main

import "fmt"

// Assigning function to the variable.
var (
	area = func(l, b int) int {
		return l * b
	}
)

func main() {
	fmt.Println(area(5, 7))
	// Passing arguments to anonymous functions.
	func(l int, b int) {
		fmt.Println(l * b)
	}(20, 30)

	// Function defined to accept a parameter and return value.
	fmt.Printf(
		"100 (°F) = %.2f (°C)\n",
		func(f float64) float64 {
			return (f - 32.0) * (5.0 / 9.0)
		}(100),
	)

}
