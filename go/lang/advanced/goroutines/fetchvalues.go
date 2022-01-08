/*
	The most natural way to fetch a value from a goroutine is channels. Channels are the pipes that
	connect concurrent goroutines. You can send values into channels from one goroutine and receive those
	values into another goroutine or in a synchronous function.
*/
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func addFive(x int, nums chan int) {
	defer wg.Done()

	nums <- x + 5
}

func main() {
	nums := make(chan int) // declaring unbuffered channel

	defer close(nums)
	defer wg.Wait()
	wg.Add(1)
	go addFive(8, nums)

	fmt.Println(<-nums)
}
