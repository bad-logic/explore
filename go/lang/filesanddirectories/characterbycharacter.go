package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
)

func main() {
	filename := "testing.txt"
	fileBuffer, err := ioutil.ReadFile(filename)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	fmt.Println("fileBuffer", fileBuffer)
	inputData := string(fileBuffer)
	fmt.Println("inputData", inputData)

	data := bufio.NewScanner(strings.NewReader(inputData))
	fmt.Println("data", data)

	data.Split(bufio.ScanRunes)

	for data.Scan() {
		fmt.Print(data.Text())
	}

}
