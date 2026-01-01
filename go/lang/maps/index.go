package main

import (
	"fmt"
)

func main() {
	map1 := map[string]int{"hello": 12}
	fmt.Println(map1, len(map1))
	map1["subs"] = 15
	fmt.Println(map1, len(map1))
	fmt.Println(map1["subs"])
	delete(map1, "hello")
	fmt.Println(map1, len(map1))

}
