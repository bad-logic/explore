/*

	A Higher-Order function is a function that receives a function as an argument or returns the function as output.
	Higher order functions are functions that operate on other functions, either by taking them as arguments or by
	returning them.

*/

package main

import "fmt"

type fm = func(int) int

func sum(a, b int) int {
	return a + b
}

func partial(a int) func(b int) int {
	return func(b int) int {
		return sum(a, b)
	}
}

func partialSum(a int) fm {
	return func(b int) int {
		return sum(a, b)
	}
}

func main() {
	s := partialSum(5)
	tot := s(5)
	sum := partial(4)(5)
	fmt.Println(sum, tot)
}
