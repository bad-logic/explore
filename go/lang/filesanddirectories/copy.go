package main

import (
	"io"
	"log"
	"os"
)

func main() {
	source, err := os.Open("testing.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer source.Close()

	destination, err := os.Create("empty/testing.txt")
	if err != nil {
		log.Fatal(err)
	}

	defer destination.Close()

	bytesCopied, err := io.Copy(destination, source)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Copied %d bytes", bytesCopied)
}
