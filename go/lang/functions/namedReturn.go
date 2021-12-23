package main

import "fmt"

func calculate(l int, b int) (perimeter, area int) {
	area = l * b
	perimeter = 2 * (l + b)
	return
}

func main() {
	fmt.Println(calculate(4, 5))
}
