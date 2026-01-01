package main

import (
	"log"
	"os"
)

func main() {
	_, err := os.Stat("empty")

	if os.IsNotExist(err) {
		errDir := os.MkdirAll("empty", 0755)
		if errDir != nil {
			log.Fatal(err)
		}
	}
}
