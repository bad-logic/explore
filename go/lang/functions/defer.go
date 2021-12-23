/*
	Go has a special statement called defer that schedules a function call to be run after the function completes.
	You can put multiple functions on the "deferred list",
	Deferred functions are executed in LIFO order
*/

package main

import "fmt"

func first() {
	defer fmt.Println("first2")
	defer fmt.Println("first1")
}

func second() {
	fmt.Println("second")
}

func main() {
	defer second()
	first()
}
