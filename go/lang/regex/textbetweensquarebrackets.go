package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	str1 := "this is a [sample] [[text]] with [[[SOME]] texts"

	re := regexp.MustCompile(`\[([^\[\]]*)\]`)

	fmt.Printf("Pattern: %v\n", re.String())
	fmt.Println("Matched: ", re.MatchString(str1))

	fmt.Println("\nText between square brackets: ")
	submatchall := re.FindAllString(str1, -1)

	for _, element := range submatchall {
		element = strings.Trim(element, "[")
		element = strings.Trim(element, "]")
		fmt.Println(element)
	}
}
