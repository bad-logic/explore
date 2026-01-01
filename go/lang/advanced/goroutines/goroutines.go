/*
	Concurrency in Golang is the ability for functions to run independent of each other. Goroutines are functions that
	are run concurrently. Golang provides Goroutines as a way to handle operations concurrently.
	New goroutines are created by the go statement.
	To run a function as a goroutine, call that function prefixed with the go statement.


	Example:
	sum()     // A normal function call that executes sum synchronously and waits for completing it
	go sum()  // A goroutine that executes sum asynchronously and doesn't wait for completing it

*/

package main

import (
	"fmt"
	"time"
)

func sum(x, y int) {
	sum := x + y
	fmt.Printf("sum of %v and %v is %v\n", x, y, sum)
}

func main() {
	go sum(1, 2)
	go sum(4, 5)
	go sum(9, 8)
	time.Sleep(1 * time.Second) // so that main goroutine sleeps for 1 seconds instead of exiting the process
}
