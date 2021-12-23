/*

	Panics can be initiated by invoking panic directly. They can also be caused by run-time errors,
	such as out-of-bounds array accesses.
	A panic is usually the best thing to do when some "impossible" situation happens,
	for instance, execution reaches a case that logically can't happen


	Recover is a built-in function that regains control of a panicking goroutine.
	Recover is only useful inside deferred functions. During normal execution, a call to
	recover will return nil and have no other effect. If the current goroutine is panicking,
	a call to recover will capture the value given to panic and resume normal execution.

*/

package main

import (
	"fmt"
)

func main() {
	var input int
	fmt.Println("Enter a number from 1 - 10")
	fmt.Scanln(&input)

	switch input {
	case 1, 2, 3, 4, 5, 6, 7, 8, 9, 10:
		fmt.Println("good")
	default:
		panic(fmt.Sprintln("error"))
	}

	defer func() {
		input := recover()
		fmt.Println(input)
	}()
}
