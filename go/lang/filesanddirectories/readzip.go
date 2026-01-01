package main

import (
	"archive/zip"
	"fmt"
	"log"
	"os"
)

func listFiles(file *zip.File) error {
	fileread, err := file.Open()
	if err != nil {
		return fmt.Errorf("Failes to open zip %s for reading: %s", file, err)
	}
	defer fileread.Close()

	fmt.Fprintf(os.Stdout, "%s:", file.Name)

	if err != nil {
		return fmt.Errorf("Failed to read zip %s for reading :%s", file.Name, err)
	}
	fmt.Println()
	return nil

}

func main() {
	filename := "test.zip"
	read, err := zip.OpenReader(filename)
	if err != nil {
		log.Fatalf("Failed to open %s", err)
	}
	defer read.Close()

	for _, file := range read.File {
		if err := listFiles(file); err != nil {
			log.Fatalf("Failed to read %s from zip: %s", file.Name, err)
		}
	}

}
