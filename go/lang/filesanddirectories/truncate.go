/*
	os.Truncate() function will reduce the file content upto N bytes passed in second parameter.
	In below example if size of test.txt file is more that 1Kb(100 byte) then it will truncate the
	remaining content.
*/

package main

import (
	"log"
	"os"
)

func main() {
	err := os.Truncate("testing.txt", 100)
	if err != nil {
		log.Fatal(err)
	}
}
