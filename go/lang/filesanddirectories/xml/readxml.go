package main

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
)

type Notes struct {
	To      string `xml:"to"`
	From    string `xml:"from"`
	Heading string `xml:"heading"`
	Body    string `xml:"body"`
}

func main() {
	data, err := ioutil.ReadFile("notes.xml")
	if err != nil {
		log.Fatal(err)
	}
	note := &Notes{}

	_ = xml.Unmarshal([]byte(data), &note)

	fmt.Println(note.To)
	fmt.Println(note.From)
	fmt.Println(note.Heading)
	fmt.Println(note.Body)
}
