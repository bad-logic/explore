package main

import (
	"archive/zip"
	"fmt"
	"io"
	"log"
	"os"
)

func appendFiles(filename string, zipw *zip.Writer) error {
	file, err := os.Open(filename)
	if err != nil {
		return fmt.Errorf("Failed to open %s :%s", filename, err)
	}

	defer file.Close()

	wr, err := zipw.Create(filename)

	if err != nil {
		return fmt.Errorf("Failed to create %s to zip: %s", filename, err)
	}

	if _, err := io.Copy(wr, file); err != nil {
		return fmt.Errorf("Failed to write %s to zip :%s", filename, err)
	}

	return nil
}

func main() {
	flags := os.O_WRONLY | os.O_CREATE | os.O_TRUNC
	file, err := os.OpenFile("test.zip", flags, 0644)
	if err != nil {
		log.Fatalf("Failed to open zip for writing: %s", err)
	}
	defer file.Close()

	files := []string{"testing.txt", "test1.txt"}

	zipw := zip.NewWriter(file)
	for _, filename := range files {
		if err := appendFiles(filename, zipw); err != nil {
			log.Fatalf("Failed to add files %s to zip file :%s", filename, err)
		}
	}
}
