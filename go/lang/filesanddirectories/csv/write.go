package main

import (
	"encoding/csv"
	"log"
	"os"
)

func main() {
	writedata := [][]string{
		{"Name", "City", "Language"},
		{"toby", "frankfurt", "german"},
		{"ben", "sydney", "english"},
		{"Sam", "new york", "englisj"},
	}

	csvfile, err := os.Create("write.csv")
	if err != nil {
		log.Fatal(err)
	}

	csvwriter := csv.NewWriter(csvfile)

	for _, row := range writedata {
		csvwriter.Write(row)
	}

	csvwriter.Flush()
	csvfile.Close()
}
