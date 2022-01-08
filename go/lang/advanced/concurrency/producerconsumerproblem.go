/*
	The problem describes two processes, the producer and the consumer, who share a common,
	fixed-size buffer used as a queue. The producer's job is to generate data, put it into
	the buffer, and start again. At the same time, the consumer is consuming the data
	(i.e., removing it from the buffer), one piece at a time. The problem is to make sure
	that the producer won't try to add data into the buffer if it's full and that the consumer
	won't try to remove data from an empty buffer. The solution for the producer is to either
	go to sleep or discard data if the buffer is full. The next time the consumer removes an
	item from the buffer, it notifies the producer, who starts to fill the buffer again. In
	the same way, the consumer can go to sleep if it finds the buffer empty. The next time
	the producer puts data into the buffer, it wakes up the sleeping consumer.
*/

package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"runtime"
	"runtime/pprof"
)

type Consumer struct {
	msgs *chan int
}

func NewConsumer(msgs *chan int) *Consumer {
	return &Consumer{msgs: msgs}
}

func (c *Consumer) consume() {
	fmt.Println("consume: Started")
	for {
		msg := <-*c.msgs
		fmt.Println("consume: Received:", msg)
	}
}

type Producer struct {
	msgs *chan int
	done *chan bool
}

func NewProducer(msgs *chan int, done *chan bool) *Producer {
	return &Producer{msgs: msgs, done: done}
}

func (p *Producer) produce(max int) {
	fmt.Println("Producer: Started")
	for i := 0; i < max; i++ {
		fmt.Println("produce: Sending", i)
		*p.msgs <- i
	}
	*p.done <- true
	fmt.Println("produce: Done")
}

func main() {
	// profile flags
	cpuprofile := flag.String("cpuprofile", "", "write cpu profile to `file`")
	memprofile := flag.String("memprofile", "", "write memory profile to `file`")

	// get the maximum number of messages from flags
	max := flag.Int("n", 5, "defines the number of messages")

	flag.Parse()

	// utilize the max num of cores available
	runtime.GOMAXPROCS((runtime.NumCPU()))

	// CPU Profile
	if *cpuprofile != "" {
		f, err := os.Create(*cpuprofile)
		if err != nil {
			log.Fatal("could not create cpu profile", err)
		}
		if err := pprof.StartCPUProfile(f); err != nil {
			log.Fatal("could not start cpu profile", err)
		}
		defer pprof.StopCPUProfile()
	}

	msgs := make(chan int)  // channel to send messages
	done := make(chan bool) // channel to notify production is done or not

	// start producing
	go NewProducer(&msgs, &done).produce(*max)

	// start consuming
	go NewConsumer(&msgs).consume()

	<-done

	// Memory Profile
	if *memprofile != "" {
		f, err := os.Create(*memprofile)
		if err != nil {
			log.Fatal("could not create memory profile:", err)
		}
		runtime.GC()
		if err := pprof.WriteHeapProfile(f); err != nil {
			log.Fatal("could not write memory profile", err)
		}
		f.Close()
	}
}
