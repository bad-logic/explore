package main

import "fmt"

func addHundred(intptr *int) {
	*intptr += 100
}

func main() {
	num := 45
	addHundred(&num)
	fmt.Println(num)
}
