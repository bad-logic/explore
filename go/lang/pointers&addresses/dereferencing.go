package main

import "fmt"

func main() {
	statement := "carpedium"
	address := &statement

	fmt.Println(statement)

	*address = "live like its your last day"

	fmt.Println(statement)
}
