/*

	Race conditions occur due to unsynchronized access to shared resource and attempt to read and write to
	that resource at the same time.
	Atomic functions provide low-level locking mechanisms for synchronizing access to integers and pointers.
	Atomic functions generally used to fix the race condition.
	The functions in the atomic under sync packages provides support to synchronize goroutines by locking
	access to shared resources.

*/

package main

import (
	"fmt"
	"runtime"
	"sync"
	"sync/atomic"
)

var (
	counter int32
	wg      sync.WaitGroup
)

func increment(name string) {
	defer wg.Done()

	for range name {
		// The AddInt32 function from the atomic package synchronizes the adding of integer values by
		// enforcing that only one goroutine can perform and complete this add operation at a time. When
		// goroutines attempt to call any atomic function, they're automatically synchronized against the
		// variable that's referenced.
		atomic.AddInt32(&counter, 1)
		runtime.Gosched() // Yield the thread and be placed back in queue.
	}

}

func main() {
	wg.Add(5)
	go increment("Python")
	go increment("Java")
	go increment("Golang")
	go increment("JavaScript")
	go increment("c++")

	wg.Wait()
	fmt.Println("Counter", counter)
}
