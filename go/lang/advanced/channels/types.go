/*
	There are two types of channels based on their behavior of data exchange: unbuffered channels and buffered channels.
	An unbuffered channel is used to perform synchronous communication between goroutines while a buffered channel is
	used for perform asynchronous communication. An unbuffered channel provides a guarantee that an exchange between
	two goroutines is performed at the instant the send and receive take place. A buffered channel has no such guarantee.

	SYNTAX:
	Unbuffered := make(chan int) // Unbuffered channel of integer type
	buffered := make(chan int, 10)	// Buffered channel of integer type

*/

package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

var wg sync.WaitGroup

func employee(projects chan string, employee int) {
	defer wg.Done()
	for {
		project, result := <-projects // Wait for project to be assigned.

		if !result { // This means the channel is empty and closed.
			fmt.Printf("Employee %d Exit\n", employee)
			return
		}
		fmt.Printf("Employee %d Started %s\n", employee, project)
		// randomly wait to simulate work time
		sleep := rand.Int63n(50)
		time.Sleep(time.Duration(sleep) * time.Millisecond)
		fmt.Println("\nTime to sleep", sleep, "ms\n")
		fmt.Printf("Employee %d Completed %s\n", employee, project)
	}
}
func main() {
	rand.Seed(time.Now().Unix())

	projects := make(chan string, 10)

	defer wg.Wait()
	defer close(projects)

	wg.Add(5)

	for i, _ := range make([]int, 5) {
		go employee(projects, i)
	}

	for j, _ := range make([]int, 10) {
		projects <- fmt.Sprintf("Project %d", j)
	}

}
