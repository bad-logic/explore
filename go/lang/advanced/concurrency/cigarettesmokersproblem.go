/*
	Assume a cigarette requires three ingredients to make and smoke: tobacco, paper, and matches.
	There are three smokers around a table, each of whom has an infinite supply of one of the three
	ingredients — one smoker has an infinite supply of tobacco, another has paper, and the third has
	matches. A fourth party, with an unlimited supply of everything, chooses at random a smoker, and
	put on the table the supplies needed for a cigarrette. The chosen smoker smokes, and the process
	should repeat indefinitely.
*/

package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

const (
	paper = iota
	tobacco
	match
)

var smokeMap = map[int]string{
	paper:   "paper",
	tobacco: "tobacco",
	match:   "match",
}

var names = map[int]string{
	paper:   "sandy",
	tobacco: "maddy",
	match:   "Daisy",
}

type Table struct {
	paper   chan int
	tobacco chan int
	match   chan int
}

var wg *sync.WaitGroup

const LIMIT = 1

func arbitrate(t *Table, smokers [3]chan int) {
	for {
		time.Sleep(time.Millisecond * 500)
		next := rand.Intn(3)
		fmt.Printf("Table chooses %s, who has %s\n", names[next], smokeMap[next])
		switch next {
		case paper:
			t.tobacco <- 1
			t.match <- 1
		case tobacco:
			t.paper <- 1
			t.match <- 1
		case match:
			t.tobacco <- 1
			t.paper <- 1
		}
		for _, smoker := range smokers {
			smoker <- next
		}
		wg.Add(1)
		wg.Wait()
	}
}

func smoker(t *Table, name string, smokes int, signal chan int) {
	var chosen = -1
	for {
		chosen = <-signal
		if smokes != chosen {
			continue
		}

		fmt.Printf("Table-> paper:%d tobacco:%d match:%d\n", len(t.paper), len(t.tobacco), len(t.match))
		select {
		case <-t.paper:
		case <-t.tobacco:
		case <-t.match:
		}
		fmt.Printf("Table-> paper:%d tobacco:%d match:%d\n", len(t.paper), len(t.tobacco), len(t.match))
		time.Sleep(time.Millisecond * 10)
		select {
		case <-t.paper:
		case <-t.tobacco:
		case <-t.match:
		}
		fmt.Printf("Table-> paper:%d tobacco:%d match:%d\n", len(t.paper), len(t.tobacco), len(t.match))
		fmt.Printf("%s smokes a cigarette\n", name)
		time.Sleep(time.Millisecond * 500)
		wg.Done()
		time.Sleep(time.Millisecond * 100)
	}
}

func main() {

	wg = new(sync.WaitGroup)
	table := new(Table)
	table.match = make(chan int, LIMIT)
	table.paper = make(chan int, LIMIT)
	table.tobacco = make(chan int, LIMIT)

	var signals [3]chan int

	for i := 0; i < 3; i++ {
		signal := make(chan int, 1)
		signals[i] = signal
		go smoker(table, names[i], i, signal)
	}

	fmt.Printf("%s, %s, %s, sit with \n%s, %s, %s\n\n", names[0], names[1], names[2], smokeMap[0], smokeMap[1], smokeMap[2])
	arbitrate(table, signals)

}
