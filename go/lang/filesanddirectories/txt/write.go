package main

import (
	"bufio"
	"log"
	"os"
)

func main() {
	text := []string{"this is the text to be written", "keep looking", "FOUND"}

	file, err := os.OpenFile("write.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err)
	}

	datawriter := bufio.NewWriter(file)

	for _, data := range text {
		datawriter.WriteString(data + "\n")
	}
	datawriter.Flush()
	file.Close()
}
