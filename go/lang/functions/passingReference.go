package main

import "fmt"

func calcArea(l, b, area *int) {
	*area = *l * *b
}

func main() {
	var area, l, b int
	l = 6
	b = 8
	calcArea(&l, &b, &area)
	fmt.Println("area", area)
}
