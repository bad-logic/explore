package main

import "fmt"

func main() {
	myList := []int{1, 2, 3}

	for index, value := range myList {
		fmt.Println(index, value)
	}

	for _, value := range myList { // ignore using _
		fmt.Println(value)
	}
}
