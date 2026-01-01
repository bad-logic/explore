package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	file, err := os.Open("read.csv")

	if err != nil {
		log.Fatal(err)
	}

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	var csvdata []string

	for scanner.Scan() {
		csvdata = append(csvdata, scanner.Text())
	}
	file.Close()

	for _, line := range csvdata {
		fmt.Println(line)
	}
}
