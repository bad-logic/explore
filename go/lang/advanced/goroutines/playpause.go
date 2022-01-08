/*

	Using channels we can play and pause execution of goroutine. A channel handles this
	communication by acting as a medium(pipe) between goroutines.


*/

package main

import (
	"fmt"
	"sync"
	"time"
)

var i int

func work() {
	time.Sleep(250 * time.Millisecond)
	i++
	fmt.Println(i)
}

func routine(command <-chan string, wg *sync.WaitGroup) {
	defer wg.Done()
	var status = "play"
	// for { select { ... } } it starts an infinite loop with the for keyword
	for {
		select {
		case cmd := <-command: // listens to channel command infinitely
			fmt.Println(cmd)
			switch cmd {
			case "stop":
				return
			case "pause":
				status = "pause"
			default:
				status = "play"
			}
		default:
			if status == "play" {
				work()
			}
		}
	}

}

func main() {
	var wg sync.WaitGroup
	wg.Add(1)
	defer wg.Wait()
	command := make(chan string)
	go routine(command, &wg)

	time.Sleep(1 * time.Second) //wait 1 second
	command <- "pause"          // send "pause" signal to command channel

	time.Sleep((1 * time.Second))
	command <- "play"

	time.Sleep((1 * time.Second))
	command <- "stop"

}
