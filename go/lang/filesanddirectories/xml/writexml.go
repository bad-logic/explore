package main

import (
	"encoding/xml"
	"io/ioutil"
)

type Notes struct {
	To      string `xml:"to"`
	From    string `xml:"from"`
	Heading string `xml:"heading"`
	Body    string `xml:"body"`
}

func main() {
	note := Notes{
		To:      "Nicky",
		From:    "Rock",
		Heading: "Meeting",
		Body:    "Meeting at 5pm",
	}

	file, _ := xml.MarshalIndent(note, "", "")

	_ = ioutil.WriteFile("post.xml", file, 0644)
}
