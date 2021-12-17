package main 

import "fmt"

func main(){
	x := 8
	y := 9
	if product := x * y; product > 60 {
		fmt.Println(product, "is greater than 60")
	}
}