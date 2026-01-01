/*
	The WaitGroup type of sync package, is used to wait for the program to finish all goroutines launched
	from the main function. It uses a counter that specifies the number of goroutines, and Wait blocks
	the execution of the program until the WaitGroup counter is zero.

	The Add method is used to add a counter to the WaitGroup.
	The Done method of WaitGroup is scheduled using a defer statement to decrement the WaitGroup counter.
	The Wait method of the WaitGroup type waits for the program to finish all goroutines.

	The Wait method is called inside the main function, which blocks execution until the WaitGroup counter
	reaches the value of zero and ensures that all goroutines are executed.
*/

package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func sum(x, y int) {
	defer wg.Done() // decrease the counter
	sum := x + y
	fmt.Printf("sum of %v and %v is %v\n", x, y, sum)
	// wg.Done() // decrease the counter
}
func main() {
	wg.Add(3) // add 3 to the counter wg waitgroup for the below 3 goroutines
	go sum(1, 2)
	go sum(4, 5)
	go sum(9, 8)
	wg.Wait() // wait for counter to reduce to zero before exiting
}
