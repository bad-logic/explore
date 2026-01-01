/*
	GO is a pass by value language
*/

package main

import "fmt"

func main() {
	var variable1 = "hello"
	fmt.Println(&variable1) // print the memory address of variable1
}
