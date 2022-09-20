/*
	The barber has one barber's chair in a cutting room and a waiting room containing a number of
	chairs in it. When the barber finishes cutting a customer's hair, he dismisses the customer and
	goes to the waiting room to see if there are others waiting. If there are, he brings one of them
	back to the chair and cuts their hair. If there are none, he returns to the chair and sleeps in it.
	Each customer, when they arrive, looks to see what the barber is doing. If the barber is sleeping,
	the customer wakes him up and sits in the cutting room chair. If the barber is cutting hair,
	the customer stays in the waiting room. If there is a free chair in the waiting room, the customer
	sits in it and waits their turn. If there is no free chair, the customer leaves.
*/

package main

import (
	"fmt"
	"sync"
	"time"
)

// iota used for incremental constants
const (
	sleeping = iota
	checking
	cutting
)

var stateLog = map[int]string{
	0: "Sleeping",
	1: "Checking",
	2: "Cutting",
}

var wg *sync.WaitGroup

type Customer struct {
	name string
}

func (c *Customer) String() string {
	return fmt.Sprintf("%p", c)[7:]
}

type Barber struct {
	name string
	sync.Mutex
	state    int // Sleeping, Checking, Cutting
	customer *Customer
}

func NewBarber() (b *Barber) {
	return &Barber{name: "Sam", state: sleeping}
}

func HairCut(c *Customer, b *Barber) {
	b.state = cutting
	b.customer = c
	b.Unlock()
	fmt.Printf("cutting %s hair\n", c)
	time.Sleep(time.Millisecond * 100)
	b.Lock()
	wg.Done()
	b.customer = nil
}

// barber goroutine
// checks for customers
// sleeps - wait for customers to wake him up
func barber(b *Barber, waitingRoomCust chan *Customer, wakers chan *Customer) {
	for {
		b.Lock()
		defer b.Unlock()
		b.state = checking
		b.customer = nil

		// check waiting room
		fmt.Printf("Checking waiting room: %d\n", len(waitingRoomCust))
		time.Sleep(time.Millisecond * 100)
		select {
		case c := <-waitingRoomCust:
			HairCut(c, b)
			b.Unlock()
		default:
			fmt.Printf("Sleeping Barber - %s\n", b.customer)
			b.state = sleeping
			b.customer = nil
			b.Unlock()
			c := <-wakers
			b.Lock()
			fmt.Printf("Woken by %s\n", c)
			HairCut(c, b)
			b.Unlock()
		}
	}
}

// customer goroutine
// leave if waiting room is full, otherwise wait in the chair
// is passed along to the channel handling it's haircut
func customer(c *Customer, b *Barber, waitingRoom chan<- *Customer, wakers chan<- *Customer) {
	// arrive
	time.Sleep(time.Millisecond * 50)
	// Barber information
	b.Lock()
	fmt.Printf("customer %s checks %s barber | waitingRoom:%d, wakers %d - customer:%s\n", c, stateLog[b.state], len(waitingRoom), len(wakers), b.customer)
	switch b.state {
	case sleeping:
		select {
		case wakers <- c:
		default:
			select {
			case waitingRoom <- c:
			default:
				wg.Done()
			}
		}
	case cutting:
		select {
		case waitingRoom <- c:
		default: // full waiting room, leave
			wg.Done()
		}
	case checking:
		panic("Customer shouldnot check for the barber when barber is checking the waiting room")
	}
	b.Unlock()
}

func main() {

	b := NewBarber()
	b.name = "Rocky"
	WaitingRoom := make(chan *Customer, 5) // 5 chairs
	Wakers := make(chan *Customer, 1)      // only one waker at a time
	go barber(b, WaitingRoom, Wakers)

	time.Sleep(time.Millisecond * 100)
	wg = new(sync.WaitGroup)
	n := 10
	wg.Add(n)

	// spawn customers
	for i := 0; i < n; i++ {
		time.Sleep(time.Millisecond * 50)
		c := new(Customer)
		go customer(c, b, WaitingRoom, Wakers)
	}
	wg.Wait()
	fmt.Println("no more customer for the day")
}
