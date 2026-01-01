/*
	pointers are the variable that store addresses
*/

package main

import "fmt"

func main() {
	num_days := 56
	// var integerPointer *int
	// integerPointer = &num_days
	integerPointer := &num_days

	fmt.Println("Address of num_days is", integerPointer)

}
