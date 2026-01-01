package main

import (
	"log"
	"os"
	"time"
)

func main() {
	filename := "testing.txt"
	_, err := os.Stat(filename)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("file exists")

	// change permission linux
	err = os.Chmod(filename, 0777)
	if err != nil {
		log.Println(err)
	}

	// change file ownership
	err = os.Chown(filename, os.Getuid(), os.Getgid())
	if err != nil {
		log.Println(err)
	}

	// change file timestamps
	addOneDayFromNow := time.Now().Add(24 * time.Hour)
	lastAccessTime := addOneDayFromNow
	lastModifyTime := addOneDayFromNow

	err = os.Chtimes(filename, lastAccessTime, lastModifyTime)
	if err != nil {
		log.Println(err)
	}

}
