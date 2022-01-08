/*
	A mutex is used to create a critical section around code that ensures only one goroutine at a time can
	execute that code section.

	USED TO PREVENT RACE CONDITIONS
*/

package main

import (
	"fmt"
	"sync"
)

var (
	counter int32
	wg      sync.WaitGroup
	mutex   sync.Mutex
)

func increment(name string) {
	defer wg.Done()
	mutex.Lock()
	{
		for range name {
			counter++
		}
	}
	mutex.Unlock()
}

func main() {
	wg.Add(5)
	go increment("Python")
	go increment("Java")
	go increment("Golang")
	go increment("JavaScript")
	go increment("C++")
	wg.Wait()
	fmt.Println("Counter", counter)
}
