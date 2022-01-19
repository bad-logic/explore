package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
)

type Catlog struct {
	ProductId string `json:"productid"`
	Quantity  string `json:"quantity"`
}

type CatlogNodes struct {
	CatlogNodes []Catlog `json:"catlog_nodes"`
}

func main() {
	file, err := ioutil.ReadFile("file.json")

	if err != nil {
		log.Fatal(err)
	}

	data := &CatlogNodes{}

	json.Unmarshal([]byte(file), data)

	for i := 0; i < len(data.CatlogNodes); i++ {
		fmt.Println("product id: ", data.CatlogNodes[i].ProductId)
		fmt.Println("quantity: ", data.CatlogNodes[i].Quantity)
	}
}
