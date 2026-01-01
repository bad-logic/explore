/*
	golang has only one looping construct for loop
*/

package main

import "fmt"

func main() {

	for i := 0; i < 10; i++ {
		if i%2 == 0 {
			fmt.Println(i)
		}
	}

	j := 0
	for j < 10 {
		fmt.Println(j)
		j++
	}
}
