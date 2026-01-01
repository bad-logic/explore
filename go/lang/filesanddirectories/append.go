package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	appendContent := "Add this content at the end of the file"
	filename := "testing.txt"

	f, err := os.OpenFile(filename, os.O_RDWR|os.O_APPEND|os.O_CREATE, 0660)
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
	defer f.Close()

	fmt.Fprintf(f, "\n%s\n", appendContent)

}
