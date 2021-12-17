/*
	Operator	Meaning:
		&&		And
		||		Or
		!		Not
*/

package main

import "fmt"

func main() {
	rightTime := true
	rightPlace := true

	if rightTime && rightPlace{
		fmt.Println("Let's do this")
	} else {
		fmt.Println("wait ...")
	}


	enoughManpower := false
	enoughTime := true

	if enoughManpower || enoughTime {
		fmt.Println("Complete everything")
	} else {
		fmt.Println("complete whatever you can")
	}
}