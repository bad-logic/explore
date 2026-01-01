package main

/*
	init functions are run before main functions.
	you are allowed to write multiple init function anywhere in the program
*/

import "fmt"

func init() {
	fmt.Println("hello from main init")
}

func init() {
	fmt.Println("this is first init function")
}

func main() {
	fmt.Println("main function started after init functions")
}

func init() {
	fmt.Println("this is second init function")
}
