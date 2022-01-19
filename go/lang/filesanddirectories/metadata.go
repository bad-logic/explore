package main

import (
	"fmt"
	"log"
	"os"
)

func main() {

	fileStat, err := os.Stat("testing.txt")

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("filenname: ", fileStat.Name())
	fmt.Println("size: ", fileStat.Size())
	fmt.Println("mode: ", fileStat.Mode())
	fmt.Println("last modified", fileStat.ModTime())
	fmt.Println("is directory", fileStat.IsDir())

}
