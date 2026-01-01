/*

	func <name of the function> (<inputs to the function>) (<datatypes of return values from the function>) {
    	// your code here
	}

*/

package main

import "fmt"

func add(a int, b int) int {
	return a + b
}

func sumAndDiff(a int, b int) (int, int) {
	return a + b, a - b
}

func main() {
	sum, _ := sumAndDiff(3, 4)

	fmt.Println(sum)
}
